import { useEffect } from 'react';

export default function usePreventSave() {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        // Disabled default Saving
        event.key === 's'
      ) {
        event.preventDefault();
      }
    };
    for (const event of ['keydown', 'keyup', 'keypress'] as const) {
      document.addEventListener(event, handler);
    }
    return () => {
      for (const event of ['keydown', 'keyup', 'keypress'] as const) {
        document.removeEventListener(event, handler);
      }
    };
  }, []);
}
