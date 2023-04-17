import { useRequest } from 'ahooks';
import { createContext, useContext } from 'react';
import { useEdgesState, useNodesState } from 'react-flow-renderer';
import { DAGEdge, DAGNode } from '../App';
import { startFrom } from '../util';
import { data } from './mock';
import { useCoordinate } from './useCoordinate';
import useEdgeAction from './useEdgeAction';
import { useOnLayout } from './useLayout';
import { useNodeAction } from './useNodeAction';
import { useDispatchAction, useUndoRedo } from './useUndoRedo';

const defaultInputPosition = { x: 100, y: 400 };

export function useNodeEdge() {
  const [edges, setEdges] = useEdgesState<DAGEdge>([]);
  const [nodes, setNodes] = useNodesState<DAGNode>([]);

  return { nodes, setNodes, edges, setEdges };
}

export type UseNodeEdge = ReturnType<typeof useNodeEdge>;

export default function useBluePrint() {
  const { edges, nodes, setEdges, setNodes } = useNodeEdge();
  const { clearRedoStack, clearUndoStack, popRedo, popUndo, pushRedo, pushUndo, redoLen, undoLen } =
    useUndoRedo();
  const { addEdges, removeEdges } = useEdgeAction({
    setEdges,
    edges,
    pushRedo,
    pushUndo,
    clearRedoStack,
  });
  const { hasSelected, onSelectChildren, addNodes, removeNodes, addNewNode } = useNodeAction({
    nodes,
    setNodes,
    edges,
    pushRedo,
    pushUndo,
    clearRedoStack,
    addEdges,
  });

  useDispatchAction({ addEdges, removeEdges, popUndo, popRedo, removeNodes, addNodes });

  const onLayout = useOnLayout({ nodes, edges, setNodes });
  const { flowRef, coordinate } = useCoordinate();

  const { loading } = useRequest(
    () =>
      new Promise<{ node_list: Array<DAGNode>; edge_list: Array<DAGEdge> }>(resolve =>
        setTimeout(() => resolve(data), 1500)
      ),
    {
      onSuccess(resp) {
        let maxNumberId = 0;
        setNodes(
          resp.node_list.map((node, i) => {
            maxNumberId = Math.max(maxNumberId, Number(node.id));
            return {
              id: node.id,
              data: node,
              position: defaultInputPosition,
              type: 'node',
            };
          })
        );
        startFrom.current = maxNumberId;
        setEdges(
          resp.edge_list.map(edge => ({
            ...edge,
            id: [edge.source, edge.target].join('-'),
            type: 'edge',
          }))
        );
        setTimeout(() => {
          onLayout();
        }, 50);
      },
    }
  );

  return {
    nodes,
    setNodes,
    edges,
    setEdges,
    loading,
    addEdges,
    removeEdges,
    onLayout,
    hasSelected,
    flowRef,
    coordinate,
    onSelectChildren,
    addNodes,
    removeNodes,
    addNewNode,
  };
}

export const BlueprintContext = createContext({} as ReturnType<typeof useBluePrint>);

export function useBPContext() {
  return useContext(BlueprintContext);
}
