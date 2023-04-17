// 1. 深克隆(考虑循环引用和 symbol 属性名和函数)

// 实现深克隆 递归版（可能爆栈）
function deepClone(target, hasCloned = new WeakMap()) {
  let type = typeof target;
  if (target && type === 'object') {
    if (hasCloned.has(target)) {
      return hasCloned.get(target);
    }

    const result = Array.isArray(target) ? [] : {};
    hasCloned.set(target, result);

    Object.keys(target)
      .concat(Object.getOwnPropertySymbols(target))
      .forEach(key => {
        result[key] = deepClone(target[key], hasCloned);
      });

    return result;
  } else if (type === 'function') {
    return cloneFunction(target);
  } else {
    return target;
  }
}

// 循环版
function deepClone(target) {
  // 将参数 target 替换为 t 属性
  // 将返回值替换为调用done函数传入参数 所以调用done函数相当于return关键字返回
  // 这样就能让后面的值返回给前面
  let result = null,
    cloneQueue = [
      {
        t: target,
        done: res => (result = res),
      },
    ],
    hasCloned = new WeakMap();

  while (cloneQueue.length) {
    let { t, done } = cloneQueue.shift(),
      type = typeof t;
    if (t && type === 'object') {
      if (hasCloned.has(t)) {
        done(hasCloned.get(t));
        continue;
      }
      let result = Array.isArray(t) ? [] : {};
      hasCloned.set(t, result);

      Object.keys(t)
        .concat(Object.getOwnPropertySymbols(t))
        .forEach(key => {
          cloneQueue.push({
            t: t[key],
            done: res => (result[key] = res),
          });
        });

      done(result);
    } else if (type === 'function') {
      done(cloneFunction(t));
    } else {
      done(t);
    }
  }

  return result;
}

/** 知识点
 * 1. 箭头函数没有prototype属性，所以不能作为构造器
 * 2. Function.prototype.toString方法可获取函数声明字符串
 * 3.
 *  箭头函数通过 eval("params => console.log(params)") 创建
 *  普通函数通过 new Function(...函数参数,函数体字符串);
 */
function cloneFunction(target) {
  const fnStr = Function.prototype.toString.call(target);
  if (target.prototype) {
    // 不能将 .*? 改成 .* 因为在函数体内部出现小括号时 .* 会包括函数体
    const args = /\((.*?)\)/s.exec(fnStr)[1];
    // 这里加上修饰符s是因为要包括换行符
    // 不能将 .* 改成 .*? 不然会被函数体内的其他大括号影响到
    const body = /\{(.*)\}/s.exec(fnStr)[1];
    return new Function(...args.split(','), body);
  } else {
    // 箭头函数使用eval进行克隆 但是这样的话this会丢失 暂时无法解决
    return eval(fnStr);
  }
}

// 2. 实现浅克隆
const _assign = function (target, ...source) {
  if (target == null) {
    throw new TypeError('error');
  }
  // 如果target是对象的话 直接修改原对象
  target = Object(target);
  source.forEach(obj => {
    // 只克隆可枚举属性+symbol
    Object.keys(obj)
      .concat(Object.getOwnPropertySymbols(obj))
      .forEach(key => {
        target[key] = obj[key];
      });
  });
  return target;
};
