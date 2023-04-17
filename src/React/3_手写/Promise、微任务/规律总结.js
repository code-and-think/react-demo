/** 1. 调用 then函数所传入的回调以微任务的形式（queueMicroTask）注册执行
 *  2. 什么时候注册？？？
 *     - 如果调用 then 的时候状态已经修改（已调用过 resolve / reject）则调用 then 的同时马上注册
 *     - 如果调用 then 的时候状态还未修改（未调用过 resolve / reject）则调用 resolve / reject 的时候注册
 *
 *  3. 对于 new Promise 所创建的 Promise 我们很容易知道它什么时候在哪里调用了 resolve / reject，那对于 then函数返回的 Promise 呢）？？？
 *     then 函数返回的 Promise 在回调函数执行完成后，根据回调函数的返回值判断
 *    - 如果返回值<不是Promise类型>，在回调执行完后马上调用 resolve
 *    - 如果返回值<是Promise类型>，则通过 queueMicroTask(() => res.then(resolve)) 注册
 */
function promiseTest1() {
  new Promise(
    // 1
    resolve => {
      console.log('外部promise');
      resolve();
    }
  )
    .then(
      // 2
      () => {
        console.log('外部第一个then');
        new Promise(
          // 3
          resolve => {
            console.log('内部promise');
            resolve();
          }
        )
          .then(
            // 4
            () => {
              console.log('内部第一个then');
              // 6  执行 queueMicroTask(() => res.then(resolve)) 注册的回调
              // 8  执行 res.then(resolve) 注册的回调 resolve，状态改变时注册下面的回调 () => { console.log('内部第二个then'); }
              return new Promise(resolve => resolve(undefined));
            }
          )
          .then(
            // 10
            () => {
              console.log('内部第二个then');
            }
          );
      }
    )
    .then(
      // 5
      () => {
        console.log('外部第二个then');
      }
    )
    .then(
      // 7
      () => {
        console.log('外部第三个then');
      }
    )
    .then(
      // 9
      () => {
        console.log('外部第四个then');
      }
    )
    .then(
      // 11
      () => {
        console.log('外部第五个then');
      }
    )
    .then(
      // 12
      () => {
        console.log('外部第六个then');
      }
    );
}

/** 多层的 Promise.resolve(Promise.resolve(Promise.resolve(data))).then(fn) 的表现
 *  如同单层的 Promise.resolve(data).then(fn)，而不是逐层取 then
 */
function promiseTest2() {
  Promise.resolve('aaa').then(
    // 1
    data => console.log(data)
  );
  Promise.resolve(Promise.resolve(Promise.resolve('bbb'))).then(
    // 2
    data => {
      console.log(data);
    }
  );
  Promise.resolve('ccc').then(
    // 3
    data => console.log(data)
  );
}

// await xxx 实际是 Promise.resolve(xxx).then(gen.next)
// return xxx 如果 xxx 为非 Promise 实际就是返回 Promise.resolve(xxx)
function asyncTest1() {
  async function fn() {
    // 0 执行到第一个 await 处，注册回调
    console.log('start');
    // 2 执行 Promise.resolve(111).then(gen.next) 注册的回调 gen.next，到下一个 await / return 处
    const a = await 111;
    console.log(a);
    // 4 返回 Promise.resolve(undefined)
  }
  queueMicrotask(
    // 1
    () => {
      console.log('aaa');
      queueMicrotask(
        // 3
        () => {
          console.log('bbb');
          queueMicrotask(
            // 5
            () => {
              console.log('ccc');
            }
          );
        }
      );
    }
  );
  fn().then(
    // 5 执行 Promise.resolve(undefined).then(() => console.log('end')) 注册的回调
    () => console.log('end')
  );
}

// 当 async 函数 return xxxPromise 时
// 实际是返回 new Promise(resolve => queueMicroTask(() => xxxPromise.then(resolve)))
function asyncTest2() {
  async function fn() {
    console.log('start');
    // 2 执行 Promise.resolve(111).then(gen.next) 注册的 gen.next
    const a = await 111;
    console.log(a);
    // 4 执行 Promise.resolve(Promise.resolve(222)).then(gen.next) 注册的 gen.next
    const b = await new Promise(resolve => {
      resolve(222);
    });
    console.log(b);
    // 6 执行 queueMicroTask(() => Promise.resolve(333).then(resolve)) 注册的回调
    // 8 执行 Promise.resolve(333).then(resolve) 注册的 resolve，然后注册回调 data => { console.log(data); }
    return Promise.resolve(333);
  }
  queueMicrotask(
    // 1
    () => {
      console.log('aaa');
      queueMicrotask(
        // 3
        () => {
          console.log('bbb');
          queueMicrotask(
            // 5
            () => {
              console.log('ccc');
              queueMicrotask(
                // 7
                () => {
                  console.log('ddd');
                  queueMicrotask(
                    // 9
                    () => {
                      console.log('eee');
                      queueMicrotask(
                        // 11
                        () => {
                          console.log('fff');
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
  fn().then(
    // 10
    data => {
      console.log(data);
    }
  );
}



function asyncTest3() {
  async function fn1() {
    // 3 执行 Promise(111).then(fn) 注册的 fn，打印 111
    return 111;
  }
  async function fn2() {
    // 1 执行 queueMicroTask(() => Promise.resolve(222).then(resolve)) 注册的回调
    // 4 () => Promise.resolve(222).then(resolve) 注册的 resolve，然后注册 fn
    // 6 执行 fn,打印 222
    return Promise.resolve(222);
  }
  async function fn3() {
    // 2 执行 Promise.resolve(Promise.resolve(333).then(gen.next) 注册回调
    // 5 执行 Promise.resolve(333).then(fn) 注册的 fn
    return await Promise.resolve(333);
  }

  fn2().then(data => console.log(data));
  fn3().then(data => console.log(data));
  fn1().then(data => console.log(data));
}

asyncTest3();
