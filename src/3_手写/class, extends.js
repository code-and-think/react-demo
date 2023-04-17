// 1. 实现 class (注意不是实现继承, extends才是实现继承)
class PersonClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getName() {
    return this.name;
  }

  static print() {
    console.log('this is print fn');
  }
}

// 基于构造器，实例方法，静态方法构建 class
function createClass(
  conc,
  // 所有放在原型上的普通方法，
  protoAttr,
  // 所有放在构造器上的静态方法
  staticAttr
) {
  function defineAttr(target, attr) {
    Object.entries(attr).forEach(([key, val]) => {
      Object.defineProperty(target, key, {
        value: val,
        enumerable: false,
        writable: true,
        configurable: true,
      });
    });
  }

  defineAttr(conc.prototype, protoAttr);
  defineAttr(conc, staticAttr);

  return conc;
}

// 原先的构造器函数增加 new.target 判断
function Person(name, age) {
  if (new.target !== Person) {
    throw new TypeError('error');
  }
  this.name = name;
  this.age = age;
}

const MockPersonClass = createClass(
  Person,
  {
    getName: function () {
      return this.name;
    },
  },
  {
    print: function () {
      console.log('this is print fn');
    },
  }
);

const person = new PersonClass('aaa', 100);
const mockPerson = new MockPersonClass('aaa', 100);

console.log({ person, PersonClass });
// print方法挂载在 MockPersonClass 上且不可枚举，getName 方法挂载在 MockPersonClass.prototype 上且不可枚举，
console.log({ mockPerson, MockPersonClass });
// console.log(MockPersonClass()) // 非 new 调用报错

// 2. 实现 extends 关键字，使用组合寄生继承实现原型方法和静态方法的继承,除此之外还需要实现实例属性的继承
class SupClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    console.log('supClass target', new.target);
  }

  getName() {
    return this.name;
  }

  static supPrint() {
    console.log('this is supClass');
  }
}

class SubClass extends SupClass {
  constructor(name, age, score) {
    super(name, age);
    this.score = score;
    console.log('subClass target', new.target);
  }

  getScore() {
    return this.score;
  }

  static subPrint() {
    console.log('this is subClass');
  }
}

// 组合寄生继承
function _inherit(subClass, supClass) {
  // 1. 类型判断 只能继承函数或null
  if (typeof supClass !== 'function') {
    throw new TypeError('Super expression must either be a function');
  }
  // 2. 创建 subClass.prototype，赋值 constructor = subClass 和 __proto__ = supClass.prototype 继承原型属性
  Object.setPrototypeOf(subClass.prototype, supClass && supClass.prototype);
  // 3. subClass.__proto__ = supClass 继承静态属性，supClass.__proto__ 为 Function.prototype 所以才能访问到 call/apply/bind等方法

  Object.setPrototypeOf(subClass, supClass);
}

function _extends(subClass, supClass) {
  // 实现原型属性继承和静态属性继承
  _inherit(subClass, supClass);

  // 模拟 super(name,age) 实现实例属性继承：
  // 不能通过 new supClass(name,age) 实现因为这样的话 new.target 不是 subClass 且还要修改实例的 __proto__
  // 通过 Reflect.construct(target,args,newTarget) 实现，相当于调用 target 方法对属性进行赋值但实际构造的是 newTarget 的实例，
  // 所以 target 函数中的 new.target 值为 newTarget，实例.__proto__ = newTarget.prototype
  return new Proxy(subClass, {
    construct(target, args) {
      // 实现实例属性继承
      return Object.assign(
        Reflect.construct(supClass, args, subClass),
        Reflect.construct(subClass, args)
      );
    },
  });
}

const MockSupClass = createClass(
  function MockSupClass(name, age) {
    this.name = name;
    this.age = age;
    console.log('supClass target', new.target);
  },
  {
    getName() {
      return this.name;
    },
  },
  {
    supPrint() {
      console.log('this is mockSupClass');
    },
  }
);

const MockSubClass = createClass(
  function MockSubClass(name, age, score) {
    this.score = score;
    console.log('subClass target', new.target);
  },
  {
    getScore() {
      return this.score;
    },
  },
  {
    subPrint() {
      console.log('this is mockSubClass');
    },
  }
);

console.dir(new SubClass('luzhihao', 18, 100), SubClass);
const MockExtendClass = _extends(MockSubClass, MockSupClass);
console.dir(new MockExtendClass('luzhihao', 100, 88), MockExtendClass);
