/** 4. 基于 3 实现的只能设置一个状态，但我们在 useState 的时候，往往不是不是只使用一个 useState。
 * - 那要怎么样才能使用多个 useState，跟踪多个状态？
 * - 而且在使用 useState 的时候我们没有显式告诉 useState 我们要使用那个状态，那么在记录多个状态的时候，
 *   要怎么让当前的 useState 和我们上一次执行的状态一一对应？
 * 在一个 useState 以执行顺序固定的情况下（以前后执行顺序组成的序列）可以对应一个顺序一致的状态数组。（结构一致，可以互相表达）
 * 可以正向推导用状态数组跟踪 useState 执行序列的范围是：有限且顺序严格固定的 useState 执行序列。
 */
let _states = [];
let _count = 0;
function useState(initial) {
  const n = _count++;
  if (_states[n] == null) {
    _states[n] = initial;
  }
  return [_states[n], newState => (_states[n] = newState)];
}

function withHooks(func) {
  return (...args) => {
    _count = 0;
    return func(...args);
  };
}

const Example = withHooks(function Example() {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [third, setThird] = useState(0);

  console.log(first, second, third);
  setFirst(first + 1);
  setSecond(second + 2);
  setThird(third + 3);
});

for (let i = 0; i < 3; i++) {
  Example();
}
