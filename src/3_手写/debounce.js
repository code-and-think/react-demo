// 相同点：防抖和节流都是短时间内多次触发 最终只执行一次
// 不同点：
// - 防抖是调用后延迟执行，如果在延迟到达之前再次调用则会刷新延迟继续推迟调用
// - 节流是调用时查看与上次执行的间隔，如果间隔足够大则执行并修改上次执行时间，否则不执行

// 1. 防抖实现
// 默认为 trailing 即设置延迟后执行，在延迟内调用会刷新延迟继续推迟调用
// 设置 leading 参数：在延迟前执行，执行后有 delay 的冷却时间，在冷却时间内调用会刷新冷却时间
function debounce(fn, delay, options) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    if (options?.leading) {
      const callNow = timer == null;
      timer = setTimeout(() => {
        timer = null;
      }, delay);

      if (callNow) {
        return fn.apply(this, args);
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  };
}

function debounceTest(fn, leading) {
  const text = `${fn === debounce ? 'debounce' : 'throttle'}  ${leading ? 'leading' : 'trailing'}`;

  const print = fn(
    function print() {
      console.log(`print ${text}`, Date.now() - pre);
    },
    500,
    leading ? { leading: true } : undefined
  );

  const pre = Date.now();

  return () => {
    console.log(`call ${text}`, Date.now() - pre);
    print();
  };
}
const withPartLine = fn => () => {
  console.log(' =========== ');
  fn();
};

const callDebounceTrailing = debounceTest(debounce, false);
const callDebounceLeading = debounceTest(debounce, true);

// 设置 800ms 时调用
setTimeout(withPartLine(callDebounceTrailing), 300);
// 取消 800ms 时调用，设置 1000ms 时调用
setTimeout(callDebounceTrailing, 500);
// 取消 1000ms 时调用，设置 1400ms 时调用
setTimeout(callDebounceTrailing, 900);

// 2300ms时立即调用，在 2800ms 时完成冷却
setTimeout(withPartLine(callDebounceLeading), 2300);
// 在冷却时继续调用，刷新到 3000ms 时完成冷却
setTimeout(callDebounceLeading, 2500);
// 在冷却时继续调用，刷新到 3400ms 时完成冷却
setTimeout(callDebounceLeading, 2900);

// 2. 节流实现
function throttle(fn, delay, options) {
  let timer;
  return function (...args) {
    if (!timer) {
      if (options?.leading) {
        fn.apply(this, args);
      }
      timer = setTimeout(() => {
        timer = null;
        if (!options?.leading) {
          fn.apply(this, args);
        }
      }, delay);
    }
  };
}

const callThrottleLeading = debounceTest(throttle, true);
const callThrottleTrailing = debounceTest(throttle, false);

// 4300ms 立即调用，设置到 4800ms 完成冷却
setTimeout(withPartLine(callThrottleLeading), 4300);
// 冷却未完成
setTimeout(callThrottleLeading, 4500);
// 冷却完成立即调用，设置到 5400ms 完成冷却
setTimeout(callThrottleLeading, 4900);

// 设置到 6800ms 调用和完成冷却
setTimeout(withPartLine(callThrottleTrailing), 6300);
// 冷却未完成
setTimeout(callThrottleTrailing, 6500);
// 冷却完成，设置到 7400ms 调用和完成冷却
setTimeout(callThrottleTrailing, 6900);
