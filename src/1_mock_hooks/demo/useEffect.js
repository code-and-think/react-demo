// 1. useEffect整个过程涉及到React哪几个生命周期？
// DidMount、DidUpdate 和 WillUnmount

/** 2. useEffect 和 React 生命周期函数核心区别是什么？
 - useEffect 和 React 生命周期函数是相同事物在不同维度下的表达。React 生命周期函数在组件维度上来处理 Effect，所以我们会把一个组件当成一个整体，处理整体的生命周期。而 useEffect 在 Effect 维度处理组件的 Effect，所以我们会把一个 Effect 当成整体，Effect 独立处理自己的生命周期，最后挂在组件生命周期上。
 - useEffect 和 React 生命周期函数干的事情一模一样，但由于抽象的维度不同，他们使用了完全相反的设计思路。
抽象维度不同对复用能力也巨大的影响，我们在组件维度上设计的时候往往设计出来的东西都以组件为基本单元进行复用，这也是组件内部逻辑难以复用的根本原因。Hooks 的抽象的维度比组件更低，以组件内具体功能为维度进行抽象，然后组合进组件。Hooks 相当于是组件的组件，Hooks 的复用能力强很多。
 */

const { isEqual } = require('lodash');

const _stack = [];
function useEffect(effect, deps) {
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

function withHooks(renderFunc) {
  return class extends React.PureComponent {
    count = 0;
    state = {};
    effect = {};

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
        cleanup?.();
      }
    }
  };
}
