// 2. 节流实现
// 时间戳版
function throttle(fn, delay) {
  let last = 0;
  return function (...args) {
    let now = Date.now();
    if (now - last >= delay) {
      last = now;
      return fn.apply(this, args);
    }
  };
}

// 定时器版
function throttle(fn, delay) {
  let timer;
  return function (...args) {
    if (!timer) {
      fn.apply(this, args);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    }
  };
}

const pre = Date.now();

// const throttlePrint = throttleTimestamp(function print() {
//   console.log('print', Date.now() - pre);
// }, 500);

const throttlePrint = throttleTimeout(function print() {
  console.log('print', Date.now() - pre);
}, 500);

const fn = () => {
  console.log('call', Date.now() - pre);
  throttlePrint();
};

// 设置 300ms 时调用，到 800ms 才冷却完成
setTimeout(fn, 300);
// 冷却未完成
setTimeout(fn, 500);
// 冷却未完成
setTimeout(fn, 700);

// 定时器版相比时间戳版的好处是可以选择在延迟前还是延迟后执行
if (!timeout) {
  // 延迟前执行
  fn.apply(this, ...args);
  timeout = setTimeout(() => {
    timeout = null;
  }, wait);
}

if (!timeout) {
  timeout = setTimeout(() => {
    // 延迟后执行
    fn.apply(this, ...args);
    timeout = null;
  }, wait);
}

// 3. 两者结合
// 只使用防抖时 如果连续触发的话间隔时间有可能很长。那现在能不能让节流和防抖结合一下?
//  1.节流: 如果距离上次调用的间隔够长的话，直接调用
//  2.防抖：如果距离上次调用的间隔不够长的话使用防抖
function debounce(fn, delay) {
  let last = 0,
    timer = null;
  return function () {
    let now = new Date();
    if (now - last >= delay) {
      fn.apply(this, arguments);
      last = now;
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, arguments);
        last = now;
      }, delay);
    }
  };
}
