import { partition } from 'lodash';
import { Edge } from 'react-flow-renderer';
import { UseNodeEdge } from '.';
import { UseUndoRedo, ActionFlag } from './useUndoRedo';

export default function useEdgeAction({
  setEdges,
  pushRedo,
  pushUndo,
  edges,
  clearRedoStack,
}: Pick<UseNodeEdge, 'setEdges' | 'edges'> &
  Pick<UseUndoRedo, 'pushRedo' | 'pushUndo' | 'clearRedoStack'>) {
  const addEdges = (newEdges: Edge[], flag: ActionFlag = 'undo', clear = false) => {
    setEdges(oldEdges => [...oldEdges, ...newEdges]);
    (flag === 'undo' ? pushUndo : pushRedo)({
      type: 'removeEdges',
      data: newEdges.map(item => item.id),
    });
    if (clear) {
      clearRedoStack();
    }
  };

  const removeEdges = (edgeIds: string[], flag: ActionFlag = 'undo', clear = false) => {
    setEdges(edges => {
      const [removedEdges, restEdges] = partition(edges, item => edgeIds.includes(item.id));
      (flag === 'undo' ? pushUndo : pushRedo)({
        type: 'addEdges',
        data: removedEdges,
      });
      return restEdges;
    });
    if (clear) {
      clearRedoStack();
    }
  };

  return { addEdges, removeEdges };
}

export type UseEdgeActionRes = ReturnType<typeof useEdgeAction>;
