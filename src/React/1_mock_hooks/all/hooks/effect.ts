import { useCounter } from '../context';
import { HooksInputs, inputsChange } from '../inputs';

type EffectCleanup = () => void;
type EffectFunc = () => void | EffectCleanup;

export interface HooksComponentEffects {
  [counter: number]: [EffectFunc | undefined, EffectCleanup | undefined, HooksInputs | undefined];
}

function useEffectHandler(
  effects: HooksComponentEffects,
  counter: number,
  effectFunc: EffectFunc,
  inputs?: HooksInputs
) {
  if (!effects.hasOwnProperty(counter)) {
    // 0 => next
    // 1 => cleanup
    // 2 => oldInputs
    effects[counter] = [effectFunc, undefined, inputs];
  } else {
    // 在重渲染时再次执行 useEffect，如果比对后发现 deps 不同的话就装填 next 以便  render 函数执行结束后调用
    // 这里使用 willUpdate 模拟
    const [, , oldInputs] = effects[counter];
    if (inputsChange(inputs, oldInputs)) {
      effects[counter][0] = effectFunc;
      effects[counter][2] = inputs;
    }
  }
}

export function runEffects(effects: HooksComponentEffects) {
  Object.getOwnPropertyNames(effects).forEach(_counter => {
    const counter = parseInt(_counter);
    const [effectFunc, cleanup] = effects[counter];
    if (typeof effectFunc === 'function') {
      if (typeof cleanup === 'function') {
        cleanup();
      }
      const nextCleanup = effectFunc();
      effects[counter][0] = undefined;
      effects[counter][1] = typeof nextCleanup === 'function' ? nextCleanup : undefined;
    }
  });
}

export function cleanupEffects(effects: HooksComponentEffects) {
  Object.getOwnPropertyNames(effects).forEach(_counter => {
    const counter = parseInt(_counter);
    const [, cleanup] = effects[counter];
    if (typeof cleanup === 'function') {
      cleanup();
    }
    delete effects[counter];
  });
}

export function useEffect(effectFunc: EffectFunc, inputs?: HooksInputs) {
  const { component, counter } = useCounter();
  useEffectHandler(component.__hooks__.effects, counter, effectFunc, inputs);
}

export function useLayoutEffect(effectFunc: EffectFunc, inputs?: HooksInputs) {
  const { component, counter } = useCounter();
  useEffectHandler(component.__hooks__.layoutEffects, counter, effectFunc, inputs);
}
