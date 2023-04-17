import { Button, Card } from '@arco-design/web-react';
import { memo, useEffect } from 'react';
import create from './react';

type GlobalState = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
};

const useBearStore = create<GlobalState>(set => ({
  bears: 0,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 }), false),
  removeAllBears: () => set({ bears: 0 }),
}));

// Zustand 的状态管理脱离于 React 组件自身的状态，它作为一个可控的第三方状态存储并通过 hooks 链接到 React 组件的生命周期。
export default function Mock() {
  const { bears } = useBearStore();

  console.log('global state rerender');

  return (
    <Card title="Mock Zustand">
      bear count: {bears}
      <Add />
      <RemoveAll />
    </Card>
  );
}

const Add = memo(() => {
  const increasePopulation = useBearStore(state => state.increasePopulation);
  console.log('add rerender');
  return <Button children="Add One" onClick={increasePopulation} />;
});

const RemoveAll = memo(() => {
  const removeAllBears = useBearStore(state => state.removeAllBears);
  console.log('removeAll rerender');
  return <Button children="Remove All" onClick={removeAllBears} />;
});
