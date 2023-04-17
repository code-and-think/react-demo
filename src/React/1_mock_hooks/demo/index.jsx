import { Button, Space } from '@arco-design/web-react';
import React from 'react';
import { isEqual } from 'lodash';

const _stack = [];

export function useState(initial) {
  const top = _stack[_stack.length - 1];
  const n = top.count++;
  if (!top.state.hasOwnProperty(n)) {
    top.state[n] = initial;
  }
  return [
    top.state[n],
    m =>
      // 继承自 React.PureComponent 的 setState
      top.setState({ [n]: m }),
  ];
}

export function useEffect(effect, deps) {
  const top = _stack[_stack.length - 1];
  const n = top.count++;
  if (!top.effect.hasOwnProperty(n)) {
    top.effect[n] = { next: effect, deps, cleanup: null };
  }
  if (!isEqual(deps, top.effect[n].deps)) {
    top.effect[n].next = effect;
    top.effect[n].deps = deps;
  }
}

export function useContext(context) {
  const top = _stack[_stack.length - 1];
  const n = top.count++;
  if (!top._context.hasOwnProperty(n)) {
    top._context[n] = {
      value: context._currentValue,
      context,
    };
  }
  return top._context[n].value;
}

export function withHooks(renderFunc) {
  return class extends React.PureComponent {
    count = 0;
    state = {};
    effect = {};
    _context = {};

    constructor(props) {
      super(props);

      const renderFuncWithStack = () => {
        _stack.push(this);
        this.count = 0;
        const result = renderFunc(this.props);
        _stack.pop();
        return result;
      };
      renderFuncWithStack();

      this.renderFunc = Object.entries(this._context).reduceRight(
        (lastRenderFunc, [n, { context }]) =>
          () =>
            (
              <context.Consumer>
                {value => {
                  this._context[n] = { value, context };
                  return lastRenderFunc();
                }}
              </context.Consumer>
            ),
        renderFuncWithStack
      );
    }

    componentDidMount() {
      this.componentDidUpdate();
    }

    componentDidUpdate() {
      for (const effect of Object.values(this.effect)) {
        if (effect.next) {
          if (effect.cleanup) {
            effect.cleanup();
          }
          effect.cleanup = effect.next();
          effect.next = null;
        }
      }
    }

    componentWillUnmount() {
      for (const { cleanup } of Object.values(this.effect)) {
        if (cleanup) {
          cleanup();
        }
      }
    }

    render() {
      const result = this.renderFunc(this.props);
      return result;
    }
  };
}

const TestContext = React.createContext({ age: 0 });

export const ReactHookDemo = withHooks(() => {
  const [count, setCount] = useState(0);
  const [age, setAge] = useState(100);

  useEffect(() => {
    console.log('parent effect', count);
  }, [count]);

  console.log('Parent render');

  return (
    <TestContext.Provider value={age}>
      <Space direction="vertical">
        <Space>
          <div>parent count: {count}</div>
          <Button children="Parent.count+1" onClick={() => setCount(count + 1)} />
          <Button children="contextValue.age+1" onClick={() => setAge(age + 1)} />
        </Space>
        <Child count={count} />
      </Space>
    </TestContext.Provider>
  );
});

export const Child = withHooks(props => {
  const [count, setCount] = useState(0);
  const age = useContext(TestContext);

  useEffect(() => {
    console.log('parent effect', count);
  }, [count]);

  console.log('child render', props);

  return (
    <Space>
      <div>child count: {count}</div>
      <div>child props.count: {props.count}</div>
      <div>contextValue.age: {age}</div>
      <Button children="Child.count+1" onClick={() => setCount(count + 1)} />
    </Space>
  );
});
