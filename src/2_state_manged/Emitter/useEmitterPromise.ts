import { pull } from 'lodash';
import { useCallback, useEffect } from 'react';

const listeners = {} as Record<string, Array<(...args: any) => Promise<any>>>;

type Emitter<
  Event,
  Payload = unknown,
  Listener = (...args: unknown extends Payload ? [] : [Payload]) => void,
  Dispatcher = (...args: unknown extends Payload ? [] : [Payload]) => Promise<any[]>
> = (eventName: Event, listener?: Listener) => Dispatcher;

type UseEmitter = Emitter<'RefreshDraft'> & Emitter<'JumpToFile', string>;

export const useEmitterPromise: UseEmitter = (eventName: string, listener?: any) => {
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
      const listenerRes = listeners[eventName]?.slice().map(listener => listener(payload));
      // TODO: all 应该换成 allSettled
      return Promise.all(listenerRes);
    },
    [eventName]
  ) as any;
};

const dispatch = useEmitterPromise('RefreshDraft');
dispatch().then(res => {
  console.log(res);
});
