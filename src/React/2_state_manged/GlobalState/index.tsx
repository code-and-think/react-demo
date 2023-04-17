import { Button, Card } from '@arco-design/web-react';
import { MonkeyZodiac } from '@icon-park/react';
import { useLayoutEffect } from 'react';
import create from 'zustand';
import Mock from './Mock';

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

// Zustand 的状态管理脱离于 React 组件自身的状态，它是作为一个可控的第三方状态存储并通过 hooks 链接到 React 组件。它的状态可以被多个 React 组件共享，而且状态的更新也会随 Reconciler 的流程而进行。
export default function GlobalState() {
  const { bears, increasePopulation, removeAllBears } = useBearStore();

  return (
    <Card title="GlobalState">
      bear count: {bears}
      <Button children="Add One" onClick={increasePopulation} />
      <Button children="Remove All" onClick={removeAllBears} />
      <Mock />
    </Card>
  );
}
