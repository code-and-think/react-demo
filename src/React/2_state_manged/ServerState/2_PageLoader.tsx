import { Message, Table } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { listPageData, ListParams } from './fetch';

const usePageLoader = <P extends { page: number; pageSize: number }, T>(
  loader: (params: P) => Promise<T>,
  params: P
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();
  useEffect(() => {
    setLoading(true);
    loader(params)
      .then(data => {
        setData(data);
      })
      .catch(error => {
        Message.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);
  return {
    loading,
    data,
  };
};

export function PageLoaderTable() {
  const [params, setParams] = useState<ListParams>({ page: 1, pageSize: 5 });
  const { data, loading } = usePageLoader(listPageData, params);

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
