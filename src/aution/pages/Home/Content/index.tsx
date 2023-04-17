import { Table } from 'antd';
import { css } from '@emotion/css';
import moment from 'moment';
import { useLayoutEffect, useState } from 'react';
import { useUserInfo } from '../../Login';
import { listService } from '../api';
import { TIME_FORMAT, useParams } from '../Filter/FilterItem';
import Bet from './Result';
import Detail from './Detail';
import { Operation } from './Operation';
import Publish from './Publish';

export interface ITableRow {
  name: string;
  desc: string;
  startPrice: string;
  startTime: number | undefined;
  endTime: number | undefined;
  img: string | undefined;
}

export default function Content() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([] as (ITableRow & { id: number })[]);
  const [count, setCount] = useState(0);
  const { onParamsChange, ...params } = useParams();
  const reload = () => setCount(count + 1);
  const { role } = useUserInfo();

  useLayoutEffect(() => {
    setLoading(true);
    listService
      .query(params)
      .then(data => {
        setRows(data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [count, params.desc, params.endTime, params.name, params.startPrice, params.startTime]);

  return (
    <>
      <div style={{ marginLeft: 24, marginBottom: 24 }}>
        {
          {
            0: <Bet />,
            1: <Publish reload={reload} />,
          }[role]
        }
      </div>
      <Table<(typeof rows)[number]>
        rowKey="id"
        loading={{ spinning: loading, tip: '正在加载数据。。。' }}
        dataSource={rows}
        pagination={{ pageSize: 8, showTotal: total => `共${total}条记录` }}
        columns={[
          {
            title: '名称',
            dataIndex: 'name',
            width: '15%',
            align: 'center',
          },
          {
            title: '描述',
            dataIndex: 'desc',
            width: '15%',
            align: 'center',
          },
          {
            title: '开始时间',
            dataIndex: 'startTime',
            width: '15%',
            align: 'center',
            render: (time: number) => {
              return moment(new Date(time)).format(TIME_FORMAT);
            },
          },

          {
            title: '结束时间',
            dataIndex: 'endTime',
            width: '15%',
            align: 'center',
            render: (time: number) => {
              return moment(new Date(time)).format(TIME_FORMAT);
            },
          },
          {
            title: '起拍价',
            dataIndex: 'startPrice',
            width: '20%',
            align: 'center',
          },
          {
            title: '操作',
            width: '20%',
            align: 'center',
            render(_, record) {
              console.log({ record });
              return {
                0: <Detail record={record} reload={reload} />,
                1: <Operation record={record} reload={reload} />,
              }[role];
            },
          },
        ]}
        className={css({
          '& .ant-table-pagination.ant-pagination': {
            padding: '0 20px',
          },
          '& .ant-pagination-options-quick-jumper input': {
            width: '70px',
          },
        })}
      />
    </>
  );
}
