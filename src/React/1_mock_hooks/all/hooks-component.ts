import * as React from 'react';
import {
  HooksComponentState,
  HooksComponentStateSetters,
  HooksComponentStateDispatchers,
} from './hooks/state';
import { HooksComponentMemos } from './hooks/memo';
import { HooksComponentRefs, HooksComponentImperativeMethods } from './hooks/ref';
import { HooksComponentContexts, bindContexts } from './hooks/context';
import { HooksComponentEffects, runEffects, cleanupEffects } from './hooks/effect';
import { withContext } from './context';

export declare class HooksComponent<Props extends {} = {}> extends React.Component<
  Props,
  HooksComponentState
> {
  public state: HooksComponentState;
  public __hooks__: {
    ref: React.RefObject<HooksComponent<Props>>;
    setters: HooksComponentStateSetters;
    dispatchers: HooksComponentStateDispatchers;
    refs: HooksComponentRefs;
    memos: HooksComponentMemos;
    contexts: HooksComponentContexts;
    effects: HooksComponentEffects;
    layoutEffects: HooksComponentEffects;
    imperativeMethods?: HooksComponentImperativeMethods<{}>;
  };
}

export type RenderFunc<Props extends {} = {}> = (
  props: Props,
  ref: React.RefObject<HooksComponent<Props>>
) => React.ReactNode;

// bindComponent 用于包装 renderFunc，返回的结果函数的执行顺序是：
// - renderFunc 调用前: push stack {component,count:0}
// - renderFunc 调用后，pop 
// 对应用栈维护组件的执行环境，避免嵌套执行时的相互影响。
export function bindComponent<Props extends {}>(
  ref: React.RefObject<HooksComponent<Props>>,
  renderFunc: RenderFunc<Props>
) {
  const component = ref.current as HooksComponent<Props>;
  return withContext(component, () => renderFunc(component.props, ref));
}

export function withHooks<Props extends {}>(
  renderFunc: RenderFunc<Props>
): React.ComponentClass<Props, HooksComponentState> {
  const HooksComponentClass = class extends React.Component<Props, HooksComponentState> {
    public state: HooksComponent['state'] = {};
    public __hooks__: HooksComponent<Props>['__hooks__'] = {
      // 当前组件实例
      ref: React.createRef(),
      setters: {},
      dispatchers: {},
      effects: {},
      layoutEffects: {},
      refs: {},
      contexts: {},
      memos: {},
      imperativeMethods: undefined,
    };

    constructor(props: Props) {
      super(props);
      (this.__hooks__.ref as any).current = this;
      // 搜集绑定 Context.Consumer 实现订阅效果
      this.render = bindContexts(
        this.__hooks__.contexts,
        bindComponent(this.__hooks__.ref, renderFunc)
      );
    }
    // 跟 正常的 layoutEffect 还是有点差别，正常的可以拿到 dom 但是这里拿不到
    componentWillMount() {
      runEffects(this.__hooks__.layoutEffects);
    }

    componentDidMount() {
      runEffects(this.__hooks__.effects);
    }

    componentWillUpdate() {
      runEffects(this.__hooks__.layoutEffects);
    }

    componentDidUpdate() {
      runEffects(this.__hooks__.effects);
    }

    componentWillUnmount() {
      cleanupEffects(this.__hooks__.effects);
      cleanupEffects(this.__hooks__.layoutEffects);
    }
  } as React.ComponentClass<Props, HooksComponentState>;

  HooksComponentClass.displayName = (renderFunc as any).name;
  return HooksComponentClass;
}
