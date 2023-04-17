export type State = object;
export type StateSelector<T extends State, U> = (state: T) => U;
export type EqualityChecker<T> = (state: T, newState: T) => boolean;
export type StateListener<T> = (state: T, previousState: T) => void;

export type SetState<T extends State> = (
  partial: Partial<T> | ((preValue: T) => Partial<T>),
  replace?: boolean
) => void;
export type GetState<T extends State> = () => T;
export type Subscribe<T extends State> = (listener: StateListener<T>) => () => void;
export type Destroy = () => void;

export type StoreApi<T extends State> = {
  setState: SetState<T>;
  getState: GetState<T>;
  subscribe: Subscribe<T>;
  destroy: Destroy;
};

export type StateCreator<T extends State> = (
  set: SetState<T>,
  get: GetState<T>,
  api: StoreApi<T>
) => T;

export default function createStore<TState extends State>(
  createState: StateCreator<TState>
): StoreApi<TState> {
  let state: TState;
  const listeners: Set<StateListener<TState>> = new Set();

  const setState: SetState<TState> = (partial, replace) => {
    const nextState =
      typeof partial === 'function' ? (partial as (state: TState) => TState)(state) : partial;
    if (nextState !== state) {
      const previousState = state;
      state = replace ? (nextState as TState) : Object.assign({}, state, nextState);
      listeners.forEach(listener => listener(state, previousState));
    }
  };

  const getState: GetState<TState> = () => state;

  const subscribe: Subscribe<TState> = listener => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const destroy: Destroy = () => listeners.clear();

  const api = { setState, getState, destroy, subscribe };
  state = createState(setState, getState, api);
  return api;
}
