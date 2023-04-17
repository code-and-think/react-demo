/** 1. 如何给一个纯函数注入状态
 * 参照 withHooks 函数，其中 renderFunc 为函数式组件，通过 withHooks 给它注入状态
 * 
 * 2. 注入状态的纯函数还是纯函数吗？？？
 * 不是了，比如这里的 renderFunc，因为 useState 不是一个纯函数，它依赖 _stack 这个外部变量，导致 renderFunc 也不是纯函数
 * 所以 hooks 出现前的函数式组件是纯函数，但是出现后就不是了
 * 
 * 3. 那怎样可以把不纯 -> 纯？
  function Foo({y}) {
    const [x, setX] = useState(0);
    return <div>{x + y}</div>
  }
  转化为
  function Foo({y}, [x=0, setX]) {
    return <div>{x + y}</div>
  }
  第一次执行时相当于传进来一个 [undefined, setX]，所以 x 是 0，以后就是传进来比如 [1, setX] 了。
  这其实就是 react 自己的 withHooks 函数

  而且所以hooks不能用在分支或者循环里是理所当然的，函数怎么可能到了运行时才去决定参数的个数和含义呢？
 */

const _stack = [];

function useState(initial) {
  const top = _stack[_stack.length - 1];
  const n = top.count++;
  if (!top.state.hasOwnProperty(n)) {
    top.state[n] = initial;
  }
  return [top.state[n], newValue => (top.state[n] = newValue)];
}

function withHooks(renderFunc) {
  return class extends React.PureComponent {
    count = 0;
    state = [];

    render() {
      this.count = 0;
      _stack.push(this);
      console.log('push', _stack);
      const result = renderFunc(this.props);
      _stack.pop();
      return result;
    }
  };
}

export const Example = withHooks(props => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div onClick={() => setCount(count + 1)}>+</div>
      <div>{count}</div>
      <div onClick={() => setCount(count - 1)}>-</div>
    </div>
  );
});
