// 悖论：在组件渲染之前无法获取 context 的值，也无法得知 use 了哪些 context，但是不知道 context 的信息就没办法加 Consumer，从而没办法实现订阅重更新功能。
// 解决办法：提前执行一遍以收集依赖的 context（react不需要执行，应该是通过静态分析实现，类似于 state hook 转参数）
const _stack = [];

function useContext(context) {
  const top = _stack[_stack.length - 1];
  const n = top.count++;
  if (!top._context.hasOwnproperty(n)) {
    top._context[n] = {
      value: context._currentValue,
      context,
    };
  }

  return top._context[n].value;
}

function withHooks(renderFunc) {
  return class extends React.PureComponent {
    constructor(props) {
      super(props);
      const renderFuncWithStack = () => {
        _stack.push(this);
        this.count = 0;
        const result = renderFunc();
        _stack.pop();
        return result;
      };
      // 收集使用到的 Context 到 this._context 里面
      renderFuncWithStack();

      this.renderFunc = Object.entries(this._context).reduceRight(
        (lastRenderFunc, [n, { context }]) => {
          return () => (
            <context.Consumer>
              {value => {
                this._context[n] = { value, context };
                return lastRenderFunc();
              }}
            </context.Consumer>
          );
        },
        renderFuncWithStack
      );
    }
  };
}
