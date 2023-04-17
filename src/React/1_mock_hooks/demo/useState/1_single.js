// 1. 纯函数
// 如果一个函数的执行过程和返回结果，既不受外部环境的改变，也不会改变外部环境，那么就称为纯函数。
// 也就是说，纯函数在任何环境下，给定相同的参数都会返回相同的结果。

// 2. 副作用
// 在函数执行过程中会对函数外部环境产生改变
// Function + Arguments + Environment -> Return + Environment'

/** 2.1 副作用的危害
 * 不可控性 —— 具有副作用的函数，无法对其行为进行准确预测，模糊边界。（相当于一个混沌系统）
 * 传递性 —— 假设有函数A、B，B 函数中调用了 A 函数，若 A 具有副作用，那么 B 函数一定具有副作用。
 */

/** 2.2 跟副作用和谐共处
 * 程序一定有副作用，没有副作用的程序是没有意义的。我们要做的是管理副作用，并且跟副作用和谐共处，而不是消灭副作用。
 * 一般有两种操作：
 * - 隔离 —— 将副作用控制在一定范围内，避免副作用扩散。
 * - 集中管理 —— 对产生副作用的操作集中管理。
 */

/** 3. 制造一个最简单的useState */
export let _state = null;
function useState(initial) {
  if (_state == null) {
    _state = initial;
  }
  return [_state, newState => (_state = newState)];
}

function Example() {
  const [count, setCount] = useState(0);
  console.log(count);
  setCount(count + 1);
}

for (let i = 0; i < 3; i++) {
  Example();
}
