import { pull } from 'lodash';
import { useCallback, useEffect } from 'react';

const listeners = {} as Record<string, Array<Function>>;

type Emitter<
  Event,
  Payload = unknown,
  Fn = (...args: unknown extends Payload ? [] : [Payload]) => void
> = (eventName: Event, listener?: Fn) => Fn;

type UseEmitter = Emitter<'RefreshDraft'> & Emitter<'JumpToFile', string>;

export const useEmitter: UseEmitter = (eventName: string, listener?: any) => {
  useEffect(() => {
    if (listener) {
      if (listeners[eventName]) {
        listeners[eventName].push(listener);
      } else {
        listeners[eventName] = [listener];
      }

      return () => {
        pull(listeners[eventName], listener);
      };
    }
  }, [eventName, listener]);

  return useCallback(
    (payload: any) => {
      listeners[eventName]?.slice().forEach(listener => listener(payload));
    },
    [eventName]
  ) as any;
};
