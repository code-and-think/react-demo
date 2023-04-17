import { Message, Table } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { ListResp, ListParams, listPageData } from './fetch';

export function Normal() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ListResp>();
  const [params, setParams] = useState<ListParams>({ page: 1, pageSize: 5 });

  useEffect(() => {
    setLoading(true);
    listPageData(params)
      .then(resp => {
        setData(resp);
      })
      .catch(err => {
        Message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  return (
    <Table
      loading={loading}
      data={data?.data}
      pagination={{
        total: data?.total,
        pageSize: params.pageSize,
        sizeOptions: [5, 10, 20],
        sizeCanChange: true,
        current: params.page,
        onChange(page, pageSize) {
          setParams({ page, pageSize });
        },
      }}
      columns={[
        { title: 'id', dataIndex: 'id' },
        { title: 'name', dataIndex: 'name' },
      ]}
    />
  );
}
