import React, { useState } from 'react';
import { Transfer } from 'antd';
import type { TransferDirection } from 'antd/es/transfer';

interface RecordType {
  key: string;
  title: string;
  description: string;
}

const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
}));

const initialTargetKeys = mockData.filter(item => Number(item.key) > 10).map(item => item.key);

const App: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const onChange = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    setTargetKeys(nextTargetKeys);
  };
  const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onScroll = (direction: TransferDirection, e: React.SyntheticEvent<HTMLUListElement>) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };

  return (
    <Transfer
      // 全集
      dataSource={mockData}
      // 右边的 keys
      targetKeys={targetKeys}
      titles={['Source', 'Target']}
      selectedKeys={selectedKeys}
      // 选择改变的时候触发
      onSelectChange={onSelectChange}
      // 点击穿梭按钮的时候触发，传入 下阶段的key/穿梭方向/这次改变的key，同时因为 select 改变会触发 onSelectChange
      onChange={onChange}
      onScroll={onScroll}
      render={item => item.title}
    />
  );
};

export default App;
