import { Button, Form, Input, message, Modal, Table } from 'antd';
import { css } from '@emotion/css';
import { useLayoutEffect, useState } from 'react';
import { ITableRow } from '.';
import { betService } from './api';
import { map } from 'lodash';
import moment from 'moment';
import { TIME_FORMAT } from '../Filter/FilterItem';
import { OperationProps } from './Operation';
import { useUserInfo } from '../../Login';
import UploadImg from './UploadImg';

export type BetRecord = {
  time: number;
  price: number;
  username: string;
};

const Item = Form.Item;

export default function Detail({ record }: OperationProps) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [betRecords, setBetRecords] = useState([] as BetRecord[]);
  const { username } = useUserInfo();
  const [form] = Form.useForm<ITableRow & { price: number }>();
  const p = Math.max(Number(record.startPrice), ...map(betRecords, 'price')) + 1;

  useLayoutEffect(() => {
    form.setFieldsValue({
      ...record,
      startTime: moment(new Date(record.startTime!)).format(TIME_FORMAT) as any,
      endTime: moment(new Date(record.endTime!)).format(TIME_FORMAT) as any,
    });

    betService.query(record.id).then(data => setBetRecords(data.data));
  }, [visible]);

  useLayoutEffect(() => {
    form.setFieldValue('price', p);
  }, [betService, visible]);

  return (
    <>
      <Button
        style={{ marginRight: 12 }}
        type="primary"
        children="竞拍"
        onClick={() => setVisible(true)}
      />
      <Modal
        visible={visible}
        centered
        title="竞拍详情"
        width={1000}
        destroyOnClose
        onOk={form.submit}
        onCancel={() => setVisible(false)}
        confirmLoading={confirmLoading}
        okButtonProps={{ disabled: Date.now() > Number(record.endTime) }}
      >
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 17 }}
          form={form}
          preserve={false}
          style={{
            width: '100%',
            display: 'flex',
          }}
          onFinish={newParams => {
            if (newParams.price < p) {
              message.error('当前出价必须大于起拍价和所有历史出价！');
              return;
            }
            setConfirmLoading(true);
            betService
              .addBet({ listItemId: record.id, price: newParams.price, username })
              .then(() => {
                message.success('出价成功');
                setVisible(false);
              })
              .finally(() => {
                setConfirmLoading(false);
              });
          }}
        >
          <div style={{ width: '50%' }}>
            <Item
              label="商品名称"
              name="name"
              rules={[
                { required: true, message: '项目名称不能为空' },
                { max: 20, message: '项目名称不可超过20个字' },
              ]}
              required
            >
              <Input readOnly type="string" placeholder="请输入项目名称" />
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
                readOnly
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
              <UploadImg disabled />
            </Item>

            <Item
              label="开始时间"
              name="startTime"
              rules={[{ required: true, message: '开始时间不能为空' }]}
              required
            >
              <Input readOnly />
            </Item>
            <Item
              label="结束时间"
              name="endTime"
              rules={[{ required: true, message: '结束时间不能为空' }]}
              required
            >
              <Input readOnly />
            </Item>
            <Item
              label="起拍价"
              name="startPrice"
              rules={[{ required: true, message: '起拍价不能为空' }]}
              required
            >
              <Input readOnly type="number" placeholder="请输入起拍价格" />
            </Item>
          </div>

          <div style={{ width: '50%' }}>
            <h4 style={{ marginBottom: 5 }}>出价纪录</h4>
            <Table
              rowKey="id"
              dataSource={betRecords}
              pagination={{ pageSize: 5, showTotal: total => `共${total}条记录` }}
              columns={[
                {
                  title: '竞拍时间',
                  dataIndex: 'time',
                  width: '30%',
                  align: 'center',
                  render(num) {
                    return moment(num).format('YYYY-MM-DD').toString();
                  },
                },
                {
                  title: '竞拍价格',
                  dataIndex: 'price',
                  width: '30%',
                  align: 'center',
                },
                {
                  title: '竞拍人',
                  dataIndex: 'username',
                  align: 'center',
                },
              ]}
            />

            {Date.now() > Number(record.endTime) ? (
              '竞拍结束！！！'
            ) : (
              <Item
                label="你的出价："
                name="price"
                rules={[{ required: true, message: '起拍价不能为空' }]}
                required
              >
                <Input
                  type="number"
                  min={Math.max(Number(record.startPrice), ...map(betRecords, 'price')) + 1}
                  placeholder="请输入你的出价"
                />
              </Item>
            )}
          </div>
        </Form>
      </Modal>
    </>
  );
}
