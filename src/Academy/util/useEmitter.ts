import { useEventBus } from '@byted/hooks';
import { Range } from 'monaco-editor';

type Emitter<
  Event,
  Payload = unknown,
  Fn = (...args: unknown extends Payload ? [] : [Payload]) => void
> = (eventName: Event, listener?: Fn) => Fn;
// RefreshDraft 重新获取草稿（用于放弃草稿节点后）
type UseEmitter = Emitter<'RefreshDraft'> &
  Emitter<'FinishSaveDraft'> &
  Emitter<
    'JumpToModel',
    {
      filePath: string;
      range: Range;
    }
  >;

export const useEmitter: UseEmitter = (eventName: string, listener?: any) => {
  return useEventBus(eventName, listener).trigger;
};
