import { useKeyPress, useMemoizedFn } from 'ahooks';
import { message } from 'antd';
import { Edge, getOutgoers, Node } from 'react-flow-renderer';
import { UseNodeEdge } from '.';
import { DAGNode } from '../App';
import { getUniqueId } from '../util';
import { createEdge } from '../util/edge';
import { UseEdgeActionRes } from './useEdgeAction';
import { ActionFlag, IAction, UseUndoRedoRes } from './useUndoRedo';

export type AddParam = {
  position: Node['position'];
  nodeId: string;
  handleType: 'source' | 'target';
};
export function useNodeAction({
  nodes,
  setNodes,
  edges,
  pushRedo,
  pushUndo,
  clearRedoStack,
  addEdges,
}: Pick<UseNodeEdge, 'nodes' | 'setNodes' | 'edges'> &
  Pick<UseEdgeActionRes, 'addEdges'> &
  Pick<UseUndoRedoRes, 'pushUndo' | 'pushRedo' | 'clearRedoStack'>) {
  const selectedIds = nodes.filter(node => node.selected).map(item => item.id);
  const onSelectAll = () =>
    setNodes(nodes =>
      nodes.map(node => (node.type === 'root' ? node : { ...node, selected: true }))
    );
  useKeyPress('meta.a', onSelectAll);

  const onSelectChildren = useMemoizedFn((nodeId?: string) => {
    if (nodeId || selectedIds.length === 1) {
      const root = nodes.find(node => node.id === nodeId ?? selectedIds[0]);

      if (root) {
        try {
          const ids = getChildrenOfNode(root, nodes, edges);

          setNodes(nodes =>
            nodes.map(node => (ids.some(id => id === node.id) ? { ...node, selected: true } : node))
          );
        } catch (error) {
          message.warning(error.message);
        }
      }
    }
  });

  const addNodes = (newNodes: Node<DAGNode>[], flag: ActionFlag = 'undo', clear = false) => {
    try {
      newNodes = newNodes.map(node => ({ ...node, selected: true }));
      setNodes(oldNodes => [...oldNodes.map(node => ({ ...node, selected: false })), ...newNodes]);
      const action = {
        type: 'removeNodes',
        data: newNodes.map(node => node.id),
      } as IAction;
      flag === 'undo' ? pushUndo(action) : pushRedo(action);
      if (clear) {
        clearRedoStack();
      }
      return newNodes;
    } catch (error) {
      message.error(error);
    }
  };
  const removeNodes = (nodeIds: string[], flag: ActionFlag = 'undo', clear = false) => {
    setNodes(nodes => {
      const removedNodes = nodes.filter(node => nodeIds.includes(node.id));
      const action = {
        type: 'addNodes',
        data: removedNodes,
      } as IAction;
      flag === 'undo' ? pushUndo(action) : pushRedo(action);
      if (clear) {
        clearRedoStack();
      }
      return nodes.filter(node => !nodeIds.includes(node.id));
    });
  };
  const addNewNode = ({ position, nodeId, handleType }: AddParam) => {
    const id = getUniqueId();
    addNodes(
      [
        {
          id,
          position,
          type: 'node',
          data: {
            id,
            work_name: id,
            is_io: true,
            is_required: true,
            des: 'this is des',
          },
        },
      ],
      'undo',
      true
    );
    const [source, target] = handleType === 'source' ? [nodeId, id] : [id, nodeId];
    addEdges([
      createEdge({
        source,
        target,
        id: `${source}-${target}`,
        sourceHandle: null,
        targetHandle: null,
      }),
    ]);
  };

  return {
    hasSelected: selectedIds.length > 0,
    onSelectChildren,
    addNodes,
    removeNodes,
    addNewNode,
  };
}

export type UseNodeActionRes = ReturnType<typeof useNodeAction>;

export function getChildrenOfNode(
  root: Node,
  nodes: Node[],
  edges: Edge[],
  result: string[] = []
): string[] {
  result.push(root.id);
  const outgoers = getOutgoers(root, nodes, edges);

  for (const node of outgoers) {
    if (node.id === result[0]) {
      throw new Error('暂不支持对环状结构执行该操作');
    }
    if (!result.includes(node.id)) {
      getChildrenOfNode(node, nodes, edges, result);
    }
  }
  return result;
}
