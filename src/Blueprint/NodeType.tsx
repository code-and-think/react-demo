import { Space } from '@arco-design/web-react';
import { css } from '@emotion/css';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { DAGNode } from '.';
import { useBPContext } from './hooks';

export const nodeTypes = { node: NodeType };

export default function NodeType({
  selected,
  id,
  data: { is_io, is_required, work_name, des },
}: NodeProps<DAGNode>) {
  const { onSelectChildren } = useBPContext();
  return (
    <div
      onDoubleClick={() => {
        onSelectChildren(id);
      }}
      style={{
        width: 220,
        display: 'flex',
        flexDirection: 'column',
        ...(selected && {
          border: '6px solid #fd9c04',
          borderRadius: 2,
          marginLeft: -6,
          marginTop: -6,
        }),
      }}
    >
      <div
        style={{
          height: 24,
          padding: 8,
          background: 'rgb(100 159 210)',
          color: '#fff',
          flex: '0 0 24px',
          fontSize: 16,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {work_name}
      </div>
      <Space
        direction="vertical"
        style={{
          position: 'relative',
          background: '#d2c6d8',
          flex: 'auto',
          display: 'flex',
          columnGap: 8,
          fontSize: 14,
          lineHeight: '20px',
          opacity: 0.9,
          padding: 10,
        }}
      >
        <Handle
          type="target"
          position={Position.Left}
          style={{
            width: 8,
            height: 8,
            //  '#d97252' : '#9e9e9e
            background: '#d97252',
            zIndex: 1,
          }}
        />
        <Space>
          {`${is_io ? '' : '非'}IO节点`}
          {`${is_required ? '强' : '弱'}依赖节点`}
        </Space>
        <Space>描述：{des ?? '-'}</Space>
        <Handle
          type="source"
          position={Position.Right}
          style={{
            width: 8,
            height: 8,
            background: '#d97252',
            zIndex: 1,
          }}
        />
      </Space>
    </div>
  );
}
