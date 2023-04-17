const [pendingStatus, fulfilledStatus, rejectedStatus] = ['pending', 'fulfilled', 'rejected'];

class Promise {
  constructor(executor) {
    this['[[PromiseStatus]]'] = pendingStatus;
    this['[[PromiseResult]]'] = undefined;
    this.callbackStack = [];

    // 同步修改状态时，在这里修改状态和res，在 then 里面调用 onResolved / onRejected
    // 异步修改状态时，在这里修改状态和res后再调用 onResolved / onRejected
    const resolve = value => {
      if (this['[[PromiseStatus]]'] === pendingStatus) {
        this['[[PromiseStatus]]'] = fulfilledStatus;
        this['[[PromiseResult]]'] = value;
        this.callbackStack.forEach(({ onResolvedFn }) => {
          onResolvedFn();
        });
      }
    };
    const reject = reason => {
      if (this['[[PromiseStatus]]'] === pendingStatus) {
        this['[[PromiseStatus]]'] = rejectedStatus;
        this['[[PromiseResult]]'] = reason;
        this.callbackStack.forEach(({ onRejectedFn }) => {
          onRejectedFn();
        });
      }
    };
    // executor 抛出异常时返回设置为错误状态
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onResolved, onRejected) {
    return new Promise((resolve, reject) => {
      // queueMicrotask(() => {
      const wrapFn = fn => {
        return () =>
          // 1. queueMicrotask 需要放在这里而不是外层是因为：
          // - 放外层的话只有状态同步修改时 onResolvedFn / onRejectedFn 才是异步调用，
          // - 当状态异步修改时  onResolvedFn / onRejectedFn 不是异步调用，导致对于下面的代码会跟原生的打印结果不同
          /**  
             * const p = new Promise(resolve => {
                setTimeout(() => {
                  Promise.resolve(111).then(value => {
                    console.log('resolve', value)
                  })
                  resolve(111)
                }, 0);
              })

              p.then(() => {
                console.log('then')
              })
             */
          queueMicrotask(() => {
            // fn 为 onResolve / onReject，如果执行时抛出错误则返回错误状态的 Promise
            try {
              const res = fn(this['[[PromiseResult]]']);
              if (res instanceof Promise) {
                // 这里是个大坑，因为并不是 res.then!!!
                queueMicrotask(() => res.then(resolve, reject));
              } else {
                resolve(res);
              }
            } catch (err) {
              reject(err);
            }
          });
      };
      // 保证值穿透
      const onResolvedFn = wrapFn(typeof onResolved === 'function' ? onResolved : value => value);
      // 保证异常穿透，在最后通过 .catch 统一处理错误
      const onRejectedFn = wrapFn(
        typeof onRejected === 'function'
          ? onRejected
          : err => {
              throw err;
            }
      );

      // 异步修改状态时，onResolved / onRejected 在 resolve / reject 中调用
      if (this['[[PromiseStatus]]'] === pendingStatus) {
        this.callbackStack.push({ onResolvedFn, onRejectedFn });
      } else {
        // 同步修改状态时，onResolved / onRejected 在这里调用
        (this['[[PromiseStatus]]'] === fulfilledStatus ? onResolvedFn : onRejectedFn)();
      }
      // })
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(onFinally) {
    return this.then(onFinally, onFinally);
  }

  // resolve 在 value 为 Promise 时会解包
  static resolve(value) {
    return new Promise((resolve, reject) => {
      // 使多层的 Promise.resolve(Promise.resolve(Promise.resolve(data))).then 的表现如同单层的 Promise.resolve(data).then
      if (value instanceof Promise) {
        if (value['[[PromiseStatus]]'] === pendingStatus) {
          value.callbackStack.push({ onResolvedFn: resolve, onRejectedFn: reject });
        } else {
          (value['[[PromiseStatus]]'] === fulfilledStatus ? resolve : reject)(
            value['[[PromiseResult]]']
          );
        }
      } else {
        resolve(value);
      }
    });
  }
  // reject 在 value 为 Promise 时不会解报
  static reject(reason) {
    return new Promise((_, reject) => reject(reason));
  }

  static all(promises) {
    return new Promise((resolve, reject) => {
      let [result, resolveCount] = [[], 0];
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(value => {
          result[i] = value;
          resolveCount++;
          if (resolveCount === promises.length) {
            resolve(result);
          }
        }, reject);
      }
    });
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach(p => {
        Promise.resolve(p).then(resolve, reject);
      });
    });
  }

  static allSettled(promises) {
    return new Promise(resolve => {
      let [result, finishCount] = [[], 0];
      for (let i = 0; i < promises.length; i++) {
        const onFinish = (status, data) => {
          if (status === fulfilledStatus) {
            result[i] = { status: fulfilledStatus, value: data };
          } else {
            result[i] = { status: rejectedStatus, reason: data };
          }
          finishCount++;
          if (finishCount === promises.length) {
            resolve(result);
          }
        };
        Promise.resolve(promises[i]).then(
          value => {
            onFinish(fulfilledStatus, value);
          },
          reason => {
            onFinish(rejectedStatus, reason);
          }
        );
      }
    });
  }
}
