import { useMouse, useLatest } from 'ahooks';
import { useEffect, useMemo, useRef } from 'react';
import { useViewport } from 'react-flow-renderer';

/**
 * 用于记录和获取画布内部坐标系内某点的坐标
 * @returns
 */
export function useCoordinate() {
  const flowRef = useRef<HTMLDivElement>(null);
  const viewport = useViewport();
  // const { clientX, clientY } = useMouse(flowRef);
  const { clientX, clientY } = { clientX: 0, clientY: 0 };

  const coordinate = useMemo(() => {
    const { left = 0, top = 0 } = flowRef.current?.getBoundingClientRect() ?? {};
    return {
      x: (clientX - left - viewport.x) / viewport.zoom,
      y: (clientY - top - viewport.y) / viewport.zoom,
    };
  }, [clientX, clientY, viewport.zoom]);

  return {
    flowRef,
    coordinate,
  };
}
