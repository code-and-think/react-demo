function ajax(config) {
  const { url, method = 'get', params = {}, headers = {}, data } = config;
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    // 1.处理请求参数
    const url = new URL(url);
    url.search = new URLSearchParams({ a: 'aaa', b: 'ccc' }).toString();

    // 2.处理请求头
    Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));
    // 3. 设置请求方法，url
    xhr.open(method, url);

    xhr.onreadystatechange = () => {
      // 3.xhr.readyState为4代表结束但不代表成功 也有可能是调用 abort 等情况 所以还需要通过 status 进一步识别
      if (xhr.readyState === 4) {
        xhr.status >= 200 && xhr.status < 300
          ? resolve({
              config,
              request: xhr,
              status: xhr.status,
              statusText: xhr.statusText,
              data: xhr.response,
              headers: xhr.getAllResponseHeaders(),
            })
          : reject(new Error('error'));
      }
    };

    xhr.send(typeof data === 'string' ? data : JSON.stringify(data));
  });
}
