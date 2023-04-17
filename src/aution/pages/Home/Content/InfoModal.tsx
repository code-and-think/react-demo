import { Button, DatePicker, Form, Input, Modal } from 'antd';
import { css } from '@emotion/css';
import moment from 'moment';
import { useLayoutEffect, useState } from 'react';
import { ITableRow } from '.';
import { TIME_FORMAT } from '../Filter/FilterItem';
import UploadImg from './UploadImg';

const Item = Form.Item;

export const InfoModal = ({
  onOk,
  onCancel,
  params,
  title,
}: {
  onOk: (params: ITableRow) => Promise<void>;
  onCancel: () => void;
  params?: ITableRow;
  title: string;
}) => {
  const [form] = Form.useForm<ITableRow>();
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    if (params) {
      params = {
        ...params,
        startTime: moment(new Date(params.startTime!), TIME_FORMAT),
        endTime: moment(new Date(params.endTime!), TIME_FORMAT),
      } as any;
      form.setFieldsValue(params as any);
    }
  }, []);

  return (
    <Modal
      visible
      centered
      title={title}
      width={600}
      destroyOnClose
      onOk={form.submit}
      onCancel={onCancel}
      confirmLoading={loading}
    >
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 17 }}
        form={form}
        preserve={false}
        onFinish={newParams => {
          setLoading(true);
          const a = {
            ...newParams,
            startTime: newParams.startTime?.valueOf(),
            endTime: newParams.endTime?.valueOf(),
          };

          if (params && 'id' in params) {
            (a as any).id = (params as any).id;
          }
          onOk(a).finally(() => setLoading(false));
        }}
      >
        <Item
          label="商品名称"
          name="name"
          rules={[
            { required: true, message: '项目名称不能为空' },
            { max: 20, message: '项目名称不可超过20个字' },
          ]}
          required
        >
          <Input type="string" placeholder="请输入项目名称" />
        </Item>
        <Item
          label="商品描述"
          name="desc"
          rules={[
            { required: true, message: '项目描述不能为空' },
            { max: 128, message: '项目描述不可超过128个字' },
          ]}
          required
        >
          <Input.TextArea
            showCount
            maxLength={128}
            placeholder="请输入商品描述"
            className={css({
              '&>textarea.ant-input': {
                height: '100px',
              },
            })}
          />
        </Item>
        <Item
          label="相关图片"
          name="img"
          rules={[{ required: true, message: '清上传相关图片' }]}
          required
        >
          <UploadImg />
        </Item>
        <Item
          label="开始时间"
          name="startTime"
          rules={[{ required: true, message: '开始时间不能为空' }]}
          required
        >
          <DatePicker showTime placeholder="请选择开始时间" />
        </Item>
        <Item
          label="结束时间"
          name="endTime"
          rules={[{ required: true, message: '结束时间不能为空' }]}
          required
        >
          <DatePicker showTime placeholder="请选择结束时间" />
        </Item>
        <Item
          label="起拍价"
          name="startPrice"
          rules={[{ required: true, message: '起拍价不能为空' }]}
          required
        >
          <Input type="number" placeholder="请输入起拍价格" />
        </Item>
      </Form>
    </Modal>
  );
};
