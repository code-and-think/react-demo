const _new = function (conc, ...args) {
  if (typeof conc !== 'function') {
    throw new TypeError('not a constructor');
  }

  // 以构造函数.prototype为原型创建空对象
  const instance = Object.create(conc.prototype);
  // 调用构造函数并将其this绑定为空对象
  // 在 conc 里面会将 new.target 设置为 conc，但这里因为没办法给 new.target 赋值所以没办法模拟
  const ret = conc.apply(instance, args);
  // 判断返回值类型 如果是引用类型的话将obj赋值为返回值
  if (ret !== null && ['function', 'object'].includes(typeof ret)) {
    instance = ret;
  }

  return instance;
};
