import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import createStore, {
  EqualityChecker,
  State,
  StateCreator,
  StateSelector,
  StoreApi,
} from './vanilla';

export type UseBoundStore<T extends State> = {
  (): T;
  <U>(selector: StateSelector<T, U>, equalityFn?: EqualityChecker<U>): U;
} & StoreApi<T>;

export default function create<TState extends State>(
  createState: StateCreator<TState> | StoreApi<TState>
): UseBoundStore<TState> {
  const api: StoreApi<TState> =
    typeof createState === 'function' ? createStore(createState) : createState;

  const useStore: any = <StateSlice>(
    selector: StateSelector<TState, StateSlice> = api.getState as any,
    equalityFn: EqualityChecker<StateSlice> = Object.is
  ) => {
    const sliceValue = selector(api.getState());
    const [{ inst }, forceUpdate] = useState({ inst: { sliceValue } });

    const checkIfSnapshotChanged = useCallback(() => {
      const { sliceValue: prevSliceValue } = inst;

      try {
        const nextSliceValue = selector(api.getState());
        return !equalityFn(prevSliceValue, nextSliceValue);
      } catch (error) {
        return true;
      }
    }, [inst, selector, equalityFn]);

    useLayoutEffect(() => {
      inst.sliceValue = sliceValue;
    }, [sliceValue]);

    useEffect(() => {
      // 1. 首次渲染时 useLayoutEffect 和前面执行的 useEffect 都可能会修改状态，而此时还未设置 listener 所以需要检查
      if (checkIfSnapshotChanged()) {
        forceUpdate({ inst });
      }

      return api.subscribe(() => {
        if (checkIfSnapshotChanged()) {
          forceUpdate({ inst });
        }
      });
    }, []);

    return sliceValue;
  };

  Object.assign(useStore, api);

  return useStore;
}
