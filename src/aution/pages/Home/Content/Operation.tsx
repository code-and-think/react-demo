import { message, Button, Modal } from 'antd';
import { useState } from 'react';
import { ITableRow } from '.';
import { listService } from '../api';
import { InfoModal } from './InfoModal';

export type OperationProps = {
  record: ITableRow & { id: number };
  reload: () => void;
};

export const Operation = ({ record, reload }: OperationProps) => {
  const { id, name } = record;
  const [visible, setVisible] = useState(false);
  const onDelete = () =>
    listService.deleteItem(id).then(
      () => {
        message.success(
          <span>
            成功删除<strong>{name}</strong>
          </span>
        );
        reload();
      },
      () => {
        message.error(<span>删除{<strong>{name}</strong>}失败，请稍后重试</span>);
      }
    );
  const onModify = () => setVisible(true);

  return (
    <>
      <Button style={{ marginRight: 12 }} type="primary" children="修改" onClick={onModify} />
      <Button
        type="primary"
        danger
        children="删除"
        onClick={() =>
          Modal.confirm({
            title: '删除竞品确认',
            content: <span>确认删除该{record.name}吗？</span>,
            onOk: onDelete,
          })
        }
      />
      {visible && (
        <InfoModal
          title="修改商品信息"
          onCancel={() => setVisible(false)}
          onOk={params =>
            listService.modifyItem(params).then(() => {
              message.success('修改成功');
              reload();
              setVisible(false);
            })
          }
          params={record}
        />
      )}
    </>
  );
};
