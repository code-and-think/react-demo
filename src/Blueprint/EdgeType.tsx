import {
  EdgeProps,
  SmoothStepEdge,
  Edge,
  StraightEdge,
  MarkerType,
  BezierEdge,
} from 'react-flow-renderer';
import { DAGEdge } from '.';
import { useBPContext } from './hooks';

export const edgeTypes = { edge: EdgeType };

export default function EdgeType(props: EdgeProps<DAGEdge>) {
  const {} = useBPContext() ?? {};
  return (
    <BezierEdge {...props} style={{ strokeWidth: 3, cursor: 'pointer' }} markerEnd={'url()'} />
  );
}
