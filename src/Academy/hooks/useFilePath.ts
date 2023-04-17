import { union } from 'lodash';
import { useState } from 'react';
import { isSameOrSubFile } from '../FileTree/utils';
import { useEmitter } from '../util/useEmitter';

export default function useFilePath() {
  const [activeFile, setActiveFile] = useState<string>();
  const [openedFile, setOpenedFile] = useState([] as string[]);
  useEmitter('RefreshDraft', () => {
    setOpenedFile([]);
    setActiveFile(undefined);
  });

  return {
    activeFile,
    setActiveFile,
    openedFile,
    setOpenedFile,
    setActiveAndOpenFile: (filePath: string | undefined) => {
      if (filePath) {
        setOpenedFile(union(openedFile, [filePath]));
      }
      setActiveFile(filePath);
    },
    onDeletePath: (delPath: string) => {
      let newActiveFilePath = activeFile;
      let activeFileNeedDel = false;
      const newOpenedFiles = openedFile.filter(item => {
        const needDel = isSameOrSubFile(delPath, item);
        if (item === activeFile) activeFileNeedDel = needDel;
        return !needDel;
      });
      setOpenedFile(newOpenedFiles);
      if (activeFile && activeFileNeedDel) {
        const index = openedFile.indexOf(activeFile);
        // activeFilePath 尽量保持下标不变，或者直接前移
        newActiveFilePath = newOpenedFiles[Math.min(index, newOpenedFiles.length - 1)];
      }
      setActiveFile(newActiveFilePath);
    },
  };
}

export type UseFilePathRes = ReturnType<typeof useFilePath>;
