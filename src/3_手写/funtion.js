// call/apply: 用 对象.方法 的形式调用实现 this 替换

// 1. 属性名定义为 Symbol 防止覆盖原有属性 然后在调用完之后记得删除
// 2. 依然存在的问题是 在调用函数里面的 thisArg 会多个属性

Function.prototype._call = function (thisArg, ...args) {
  // 类似于 map/filter 的 thisArg 处理
  thisArg = thisArg == undefined ? window : Object(thisArg);

  const fn = this;
  const key = Symbol();

  thisArg[key] = fn;
  const res = thisArg[key](...args);
  delete thisArg[key];

  return res;
};

// bind
Function.prototype._bind = function (thisArg, ...bindArgs) {
  thisArg = thisArg == null ? window : Object(thisArg);

  const fn = this;
  return function bindFn(...args) {
    let allArgs = [...bindArgs, ...args];
    // new 调用时
    if (new.target === bindFn) {
      // 被当作构造器调用时直接new原函数
      return new fn(...allArgs);
    } else {
      // 否则就走call的逻辑
      const key = Symbol();

      thisArg[key] = fn;
      const res = thisArg[key](...allArgs);
      delete thisArg[key];

      return res;
    }
  };
};
