import { Button, message } from 'antd';
import { useState } from 'react';
import { listService } from '../api';
import { InfoModal } from './InfoModal';

export default function Publish({ reload }: { reload: () => void }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="primary" children="发布" onClick={() => setVisible(true)} />
      {visible && (
        <InfoModal
          title='发布商品'
          onCancel={() => setVisible(false)}
          onOk={async params => {
            listService.addItem(params).then(() => {
              setVisible(false);
              message.success('发布成功');
              reload();
            });
          }}
        />
      )}
    </>
  );
}
