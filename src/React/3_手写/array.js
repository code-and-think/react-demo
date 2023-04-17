// map 函数实现
Array.prototype._map = function (callback, thisArg) {
  // 1. 判断 callback 是否为函数类型
  if (typeof callback !== 'function') {
    throw new TypeError('error');
  }
  // 2. thisArg 赋值
  thisArg = thisArg == null ? window : Object(thisArg);

  const [res, arr] = [[], this];
  // 3. 遍历数组，使用 call 函数修改 callback 的 this 属性
  for (let i = 0; i < arr.length; i++) {
    res[i] = callback.call(thisArg, arr[i], i, arr);
  }

  return res;
};

// filter
Array.prototype._filter = function (callback, thisArg) {
  // 前面也是 callback 和 thisArg 判断
  const arr = this;
  const res = [];
  thisArg = thisArg == null ? window : Object(thisArg);

  for (let i = 0; i < arr.length; i++) {
    if (callback.call(thisArg, arr[i], i, arr)) {
      res.push(arr[i]);
    }
  }
  return res;
};

// reduce
Array.prototype._reduce = function (callback, initVal) {
  const arr = this;
  // 1. 初始值与 startIndex 的不同情况赋值
  let res, startIndex;
  if (initVal == null) {
    if (arr.length < 1) {
      throw new Error('error');
    }
    [res, startIndex] = [arr[0], 1];
  } else {
    [res, startIndex] = [initVal, 0];
  }
  // 2. 遍历数组
  for (let i = startIndex; i < arr.length; i++) {
    res = callback(res, arr[i], i, arr);
  }

  return res;
};

// 4. 用reduce实现map
Array.prototype._map = function (callback, thisArg) {
  return this.reduce((res, ...args) => {
    thisArg = thisArg == null ? window : Object(thisArg);

    res.push(callback.apply(thisArg, args));
    return res;
  }, []);
};

// 5. flat 拍平
Array.prototype._flat = function (depth = 1) {
  return depth > 0
    ? this.reduce((res, item) => res.concat(Array.isArray(item) ? item._flat(depth - 1) : item), [])
    : this;
};
