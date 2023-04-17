import { Edge, Connection } from 'react-flow-renderer';

export function createEdge(
  edge: Omit<Edge, 'id' | 'source' | 'sourceHandle' | 'target' | 'targetHandle'> & {
    id?: string;
  } & Connection
): Edge {
  const { source, sourceHandle, target, targetHandle, ...rest } = edge;
  if (!source || !target) {
    throw new Error('');
  }
  return {
    // source node 的 id
    source,
    // source node 的连接点的 id
    sourceHandle,
    target,
    targetHandle,
    // 连线的 id
    id: createEdgeId({ source, sourceHandle, target, targetHandle }),
    style: { strokeWidth: 3 },
    ...rest,
  };
}

export function createEdgeId({ source, sourceHandle, target, targetHandle }: Connection) {
  return `${source}:${sourceHandle}-${target}:${targetHandle}`;
}
