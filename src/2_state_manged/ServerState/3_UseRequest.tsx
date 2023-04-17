/** pageLoader只适用于分页请求，而更通用的请求管理hooks需要具备的能力
 * 1. 可以控制组件挂载后是否请求
 * 2. 基于 deps数组 控制的重新请求
 * 3. 钩子函数： onSuccess / onError / onFinally
 * 4. 防抖，节流
 * 5. swr
 * 。。。
 */

import { Message, Table } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import { useState } from 'react';
import { listPageData, ListParams } from './fetch';

export const UseRequest = () => {
  const [params, setParams] = useState<ListParams>({ page: 1, pageSize: 5 });
  const { data, loading } = useRequest(() => listPageData(params), {
    manual: false, // 1
    refreshDeps: [params], // 2
    // 3
    onSuccess() {
      Message.success('请求成功');
    },
    // 4
    debounceWait: 500,
    // 5
    cacheKey: 'list_data',
  });

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
};
