import { useDebounceFn, useRequest } from 'ahooks';
import produce from 'immer';
import { useEffect, useRef } from 'react';
import { isSameOrSubFile } from '../FileTree/utils';
import { getMonacoModel } from '../RightSide/monacoUtil';
import { useEmitter } from '../util/useEmitter';
import { useDraft } from './useDraft';
import { UsePathStatusRes } from './usePathStatus';

export type SaveDraftProps = { id: number } & Pick<
  UsePathStatusRes,
  'clearUnSavePath' | 'addUnSavePath'
>;

export function useRootWithSave({ clearUnSavePath, id, addUnSavePath }: SaveDraftProps) {
  const {
    run: fetchDraft,
    data: draft,
    mutate: setDraft,
  } = useDraft({
    id: String(id),
    manual: false,
  });
  // 重新获取草稿版本
  useEmitter('RefreshDraft', fetchDraft);
  // 保存草稿后，如果历史版本 drawer 为打开状态的话需要 reload 历史版本列表
  const emitFinishSaveDraft = useEmitter('FinishSaveDraft');
  const saveCodeTreeRef = useRef(false);
  const { run: runSaveCodeTree } = useRequest(
    () => new Promise(resolve => setTimeout(resolve, 1000)),
    {
      ready: draft != null,
      manual: true,
      onSuccess() {
        emitFinishSaveDraft();
        clearUnSavePath();
      },
    }
  );
  useEffect(() => {
    if (saveCodeTreeRef.current) {
      runSaveCodeTree();
      saveCodeTreeRef.current = false;
    }
  }, [draft]);
  const { run: debounceSaveFile } = useDebounceFn(
    (path: string) => {
      if (draft) {
        const content = getMonacoModel(path)?.getValue();
        const travel = (node: CodeTree, subPath: string) => {
          const part = `/${node.title}`;
          if (subPath === part) {
            node.content = content ?? '';
          } else if (isSameOrSubFile(part, subPath)) {
            node.children?.map(item => travel(item, subPath.slice(part.length)));
          }
        };
        setDraft(draft => {
          const res =
            draft == null || draft == null ? draft : produce(draft, root => travel(root, path));
          saveCodeTreeRef.current = res !== draft;
          return res;
        });
      }
    },
    { wait: 1000 }
  );

  return {
    onSaveFileContent: (path: string) => {
      addUnSavePath(path);
      debounceSaveFile(path);
    },
    root: draft,
    onSaveRoot: (newRoot: typeof draft) => {
      setDraft(draft => {
        const res = draft == null ? draft : newRoot;
        saveCodeTreeRef.current = res !== draft;
        return res;
      });
    },
  };
}

export type UseRootWithSaveRes = ReturnType<typeof useRootWithSave>;
