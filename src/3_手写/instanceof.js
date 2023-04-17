const obj = {
  // xxx instanceof obj 时会将 left 传入，
  [Symbol.hasInstance](left) {
    return true;
  },
};
// 左边不是对象直接返回 false???
const _instanceof = (left, right) => {
  const hasInstance = right[Symbol.hasInstance];
  if (typeof hasInstance === 'function') {
    return hasInstance(left);
  }
  if (typeof right !== 'function') {
    throw new TypeError("Right-hand side of ' instanceof ' is not callable");
  }
  let proto = left.__proto__;
  const prototype = right.prototype;

  while (proto) {
    if (proto === prototype) {
      return true;
    }
    proto = proto.__proto__;
  }
  return false;
};
