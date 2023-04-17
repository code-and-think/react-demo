import { useKeepPage } from '@byted/hooks';
import { useEffect, useState } from 'react';

export default function usePathStatus() {
  const [unsavedPaths, setUnsavedPaths] = useState([] as string[]);
  const [highLightPaths, setHighLightPaths] = useState([] as string[]);
  const [, setKeepPage] = useKeepPage(false);

  useEffect(() => {
    setKeepPage(Boolean(unsavedPaths.length));
  }, [unsavedPaths]);

  return {
    unsavedPaths,
    highLightPaths,
    setHighLightPaths,
    addUnSavePath: (path: string) => {
      setUnsavedPaths(unsavedPaths =>
        unsavedPaths.includes(path) ? unsavedPaths : unsavedPaths.concat(path)
      );
    },
    clearUnSavePath: () => setUnsavedPaths([]),
    isUnSave: (path: string) => {
      return unsavedPaths.includes(path);
    },
    isHighLight: (path: string) => {
      return highLightPaths.includes(path);
    },
  };
}

export type UsePathStatusRes = ReturnType<typeof usePathStatus>;
