// 通过 Promise.race 实现超时取消请求，相当于 xhr 的 timeout 属性搭配 ontimeout 超时自动取消请求
// 通过Promise.race([超时就改变状态为失败的Promise, 请求得到响应才改变状态的Promise])实现：
// - 如果网络超时则 race 的返回值 Promise 的状态为失败 且值为超时 Promise 的错误提示信息
// - 如果网络不超时则 race 的返回值 Promise 的状态由响应数据决定

function request(url) {
  // 实现超时自动取消请求
  let abortRequest;
  return {
    requestPromise: new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('get', url);

      xhr.onreadystatechange = () => {
        console.log(xhr.readyState, xhr.status)
        // 注意在通过 abort 中断请求时 readyState 也是4,所以要通过 status 进行区分
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(xhr.response);
        }
      };

      abortRequest = xhr.abort.bind(xhr);
      xhr.send();
    }),
    abortRequest,
  };
}

function judgeTimeout(url, wait) {
  let req = request(url);

  Promise.race([getTimeoutPromise(wait, req.abortRequest), req.requestPromise]).then(
    data => {
      console.log(data);
    },
    reason => {
      console.log(reason);
    }
  );
}

function getTimeoutPromise(wait, callback) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      callback?.();
      reject('请求超时,请重试...');
    }, wait);
  });
}

judgeTimeout('http://localhost:8888/', 500);