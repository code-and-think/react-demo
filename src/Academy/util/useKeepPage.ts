import { useState } from 'react';
import { useEventListener } from 'ahooks';

export default function useKeepPage(
  initShouldKeepPage: boolean,
  onLeave?: Function
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [shouldKeepPage, setShouldKeepPage] = useState<boolean>(initShouldKeepPage);
  useEventListener('beforeunload', (event: BeforeUnloadEvent) => {
    if (shouldKeepPage) {
      if (onLeave) onLeave();
      event.preventDefault();
      event.returnValue = '';
      return '/';
    }
  });
  return [shouldKeepPage, setShouldKeepPage];
}
