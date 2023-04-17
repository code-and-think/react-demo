import { Button, Modal, Table, Tabs } from 'antd';
import { useLayoutEffect, useState } from 'react';
import { ITableRow } from '.';
import { listService } from '../api';
import { betService } from './api';
import { BetRecord } from './Detail';
import moment from 'moment';
import { useUserInfo } from '../../Login';

type EndedItem = Pick<ITableRow, 'name' | 'startTime' | 'endTime' | 'startPrice'> &
  Pick<BetRecord, 'price' | 'username'>;

type BettingItem = Pick<ITableRow, 'name' | 'startTime' | 'endTime' | 'startPrice'> & {
  records: Array<{ username: string; price: string }>;
};

export default () => {
  const [visible, setVisible] = useState(false);
  const [activeKey, setActiveKey] = useState('1');
  const [result, setResult] = useState({ ended: [] as EndedItem[], betting: [] as BettingItem[] });
  const username = useUserInfo().username;

  useLayoutEffect(() => {
    betService.result().then(data => {
      setResult(data.data);
    });
  }, [visible]);

  return (
    <>
      <Button type="primary" children="竞拍结果" onClick={() => setVisible(true)} />
      {visible && (
        <Modal
          title="竞拍结果"
          visible={visible}
          centered
          footer={null}
          width={1000}
          destroyOnClose
          onCancel={() => setVisible(false)}
        >
          <Tabs
            style={{ overflow: 'visible', marginTop: -10 }}
            activeKey={activeKey}
            onChange={setActiveKey}
          >
            <Tabs.TabPane key="1" tab="正在拍卖的商品">
              <Table
                rowKey="id"
                dataSource={result.betting}
                columns={[
                  {
                    title: '名称',
                    dataIndex: 'name',
                    width: '15%',
                    align: 'center',
                  },
                  {
                    title: '开始时间',
                    dataIndex: 'startTime',
                    width: '15%',
                    align: 'center',
                    render(num) {
                      return moment(num).format('YYYY-MM-DD').toString();
                    },
                  },
                  {
                    title: '结束时间',
                    dataIndex: 'endTime',
                    width: '15%',
                    align: 'center',
                    render(num) {
                      return moment(num).format('YYYY-MM-DD').toString();
                    },
                  },
                  {
                    title: '起拍价',
                    dataIndex: 'startPrice',
                    width: '15%',
                    align: 'center',
                  },
                  {
                    title: '出价记录',
                    dataIndex: 'records',
                    align: 'center',
                    render(records) {
                      return (
                        <div>
                          {(records as any[]).map(item => (
                            <div>
                              用户名：{item.username} 价格：{item.price}{' '}
                            </div>
                          ))}
                        </div>
                      );
                    },
                  },
                ]}
              />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab="拍卖结束的商品">
              <Table
                rowKey="id"
                dataSource={result.ended}
                columns={[
                  {
                    title: '名称',
                    dataIndex: 'name',
                    width: '15%',
                    align: 'center',
                  },
                  {
                    title: '开始时间',
                    dataIndex: 'startTime',
                    width: '15%',
                    align: 'center',
                    render(num) {
                      return moment(num).format('YYYY-MM-DD').toString();
                    },
                  },
                  {
                    title: '结束时间',
                    dataIndex: 'endTime',
                    width: '15%',
                    align: 'center',
                    render(num) {
                      return moment(num).format('YYYY-MM-DD').toString();
                    },
                  },
                  {
                    title: '起拍价',
                    dataIndex: 'startPrice',
                    width: '15%',
                    align: 'center',
                  },
                  {
                    title: '成交价',
                    dataIndex: 'price',
                    width: '15%',
                    align: 'center',
                  },
                  {
                    title: '买家',
                    dataIndex: 'username',
                    align: 'center',
                    render(name) {
                      return <strong>{name}</strong>;
                    },
                  },
                ]}
              />
            </Tabs.TabPane>
            <Tabs.TabPane
              key="3"
              disabled
              tab={
                <>
                  当前用户名为 <strong>{username}</strong>
                </>
              }
            />
          </Tabs>
        </Modal>
      )}
    </>
  );
};
