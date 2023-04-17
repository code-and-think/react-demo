// 5. 虽然一个函数多个状态的情况已经完美解决，但如果我们需要在一个被追踪状态的函数里面再调用其他需要追踪状态（父组件嵌套子组件）
// 怎么样做才能保证每个组件各自维持自己的状态不乱？

// 答：使用栈来保持入口环境，也就是在原来的环境上叠加一层新的环境，处理一些新任务，当任务处理完成时撤掉添加的新环境后就可以还原至入口环境，这样就可以在保证原来环境不变的情况下进入新环境处理新任务。
// 而函数栈就是为了函数调用时保持调用环境不变的数据结构（充分体现栈的作用）
// 栈可以用来表达树在遍历过程中的中间状态。一棵树为 T，令 C 为从 T 根节点向下遍历任意个数产生的序列集合，令 S 为遍历 T 是产生的栈的状态集合，那么 S = C。
// 相反的，当我们需要显示使用栈进行遍历时，往往隐含了一棵树。

const _stack = [];
function useState(initial) {
  const top = _stack[_stack.length - 1];
  const n = top.count++;
  if (top.states[n] == null) {
    top.states[n] = initial;
  }
  return [top.states[n], newState => (top.states[n] = newState)];
}
function withHooks(func) {
  const states = [];
  return (...args) => {
    _stack.push({ count: 0, states });
    const result = func(...args);
    _stack.pop();
    return result;
  };
}

const Example2 = withHooks(() => {
  const [first, setFirst] = useState(10);
  console.log('Example2', first);
  setFirst(first - 1);
});

const Example1 = withHooks(() => {
  const [first, setFirst] = useState(0);
  Example2();
  const [second, setSecond] = useState(0);
  const [third, setThird] = useState(0);
  console.log('Example', first, second, third);
  setFirst(first + 1);
  setSecond(second + 2);
  setThird(third + 3);
});

for (let i = 0; i < 3; i++) {
  Example1();
}
