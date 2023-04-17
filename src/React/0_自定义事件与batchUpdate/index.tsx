import BatchUpdate from './2_batchUpdate';
import EffectSequence from './3_effect里面调用setState';

export default function ReactTheory() {
  return (
    <div>
      {/* <SyncRender /> */}
      {/* <BatchUpdate /> */}
      <EffectSequence />
    </div>
  );
}
