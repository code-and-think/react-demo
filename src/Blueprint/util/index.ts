import { uniqueId } from 'lodash';
import { useViewport } from 'react-flow-renderer';

export const neverThrow = (value: never) => {
  throw new Error(`Oops, not supposed to throw: ${value}`);
};

export let startFrom = { current: 0 };
export const getUniqueId = () => {
  return String(startFrom.current + Number(uniqueId()));
};

export const useOffsetPosToFlowPos = () => {
  const { x, y, zoom } = useViewport();
  return ({ clientX, clientY }: { clientX: number; clientY: number }) => {
    return { x: (clientX - x) / zoom, y: (clientY - y) / zoom };
  };
};
