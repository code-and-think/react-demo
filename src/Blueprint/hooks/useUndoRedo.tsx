import { useKeyPress } from 'ahooks';
import { useMemo, useRef } from 'react';
import { Edge, Node } from 'react-flow-renderer';
import { neverThrow } from '../util';
import { UseEdgeActionRes } from './useEdgeAction';
import { UseNodeActionRes } from './useNodeAction';

export function useUndoRedo() {
  const undoStack = useRef<IAction[]>([]);
  const redoStack = useRef<IAction[]>([]);

  const { clearUndoStack, popUndo, pushUndo } = useMemo(() => {
    return {
      pushUndo: (action: IAction) => {
        undoStack.current.push(action);
      },
      popUndo: (): { action: IAction; flag: ActionFlag } | undefined => {
        if (undoStack.current.length) {
          const action = undoStack.current.pop()!;
          return { action, flag: 'redo' };
        }
      },
      clearUndoStack: () => {
        undoStack.current = [];
      },
    };
  }, []);

  const { clearRedoStack, popRedo, pushRedo } = useMemo(() => {
    return {
      pushRedo: (action: IAction) => {
        redoStack.current.push(action);
      },
      popRedo: (): { action: IAction; flag: ActionFlag } | undefined => {
        if (redoStack.current.length) {
          const action = redoStack.current.pop()!;
          return {
            action,
            flag: 'undo',
          };
        }
      },
      clearRedoStack: () => {
        redoStack.current = [];
      },
    };
  }, []);

  return {
    pushUndo,
    popUndo,
    clearUndoStack,
    undoLen: undoStack.current.length,
    pushRedo,
    popRedo,
    clearRedoStack,
    redoLen: redoStack.current.length,
  };
}

export type UseUndoRedoRes = ReturnType<typeof useUndoRedo>;

export function useDispatchAction({
  addEdges,
  removeEdges,
  popUndo,
  popRedo,
  addNodes,
  removeNodes,
}: Pick<UseEdgeActionRes, 'addEdges' | 'removeEdges'> &
  Pick<UseNodeActionRes, 'addNodes' | 'removeNodes'> &
  Pick<UseUndoRedoRes, 'popRedo' | 'popUndo'>) {
  const dispatch = (flag: ActionFlag) => {
    const payload = (flag === 'undo' ? popUndo : popRedo)();
    if (payload) {
      const { action, flag } = payload;
      switch (action.type) {
        case 'addEdges':
          return addEdges(action.data, flag);

        case 'removeEdges':
          return removeEdges(action.data, flag);

        case 'addNodes':
          return addNodes(action.data, flag);

        case 'removeNodes':
          return removeNodes(action.data, flag);

        default:
          return neverThrow(action);
      }
    }
  };

  useKeyPress('meta.z', () => dispatch('undo'), { exactMatch: true });
  useKeyPress('meta.shift.z', () => dispatch('redo'), { exactMatch: true });
}

export type UseUndoRedo = ReturnType<typeof useUndoRedo>;

export type IAction = IAddNodesAction | IRemoveNodesAction | IAddEdgesAction | IRemoveEdgesAction;

export type ActionFlag = 'undo' | 'redo';

interface IAddNodesAction {
  type: 'addNodes';
  data: Node[];
}

interface IRemoveNodesAction {
  type: 'removeNodes';
  data: string[];
}

interface IAddEdgesAction {
  type: 'addEdges';
  data: Edge[];
}

interface IRemoveEdgesAction {
  type: 'removeEdges';
  data: string[];
}
