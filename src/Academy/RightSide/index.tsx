import { ReactNode } from 'react';

export type RightSideProps = Record<'codeTabs' | 'codeEditor', ReactNode>;

export default function RightSide({ codeEditor, codeTabs }: RightSideProps) {
  return (
    <div
      style={{
        flex: 1,
        width: 0,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Tabs + 功能按钮 */}
      <div style={{ display: 'flex', background: '#f3f3f3' }}>{codeTabs}</div>
      <div style={{ display: 'flex', height: 0, flex: 1 }}>
        {/* Editor + 展示模块 */}
        <div
          style={{
            width: 0,
            flex: 1,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ flex: 1, height: 0 }}>{codeEditor}</div>
        </div>
      </div>
    </div>
  );
}
