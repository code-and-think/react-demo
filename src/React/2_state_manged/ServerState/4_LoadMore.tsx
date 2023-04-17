import { Select, Spin } from '@arco-design/web-react';
import { useInfiniteScroll } from 'ahooks';
import React, { useState } from 'react';

const PAGE_SIZE = 10;
// 使用 useLoadMore 实现具有搜索和下拉加载更多功能的Select组件
export default function SearchSelectLoadMore() {
  const [value, onChange] = useState();
  const [keyword, setKeyword] = useState('');
  const [debounceLoading, setDebounceLoading] = useState(false);
  const {
    data,
    loading: dataLoading,
    loadMore,
    noMore,
  } = useInfiniteScroll(
    params => {
      const page = params ? Math.ceil(params.list.length / PAGE_SIZE) + 1 : 1;
      return listService({ page_num: page, page_limit: PAGE_SIZE, keyword });
    },
    {
      manual: false,
      reloadDeps: [keyword],
      onFinally() {
        setDebounceLoading(false);
      },
      isNoMore(data) {
        return data?.total === data?.list.length;
      },
    }
  );

  const SpinComp = (
    <Spin style={{ height: 37, display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
  );

  return (
    <Select
      allowClear
      showSearch
      value={value}
      onChange={onChange}
      onSearch={val => {
        setDebounceLoading(true);
        setKeyword(val);
      }}
      onPopupScroll={({ scrollTop, scrollHeight, clientHeight }) => {
        const scrollBottom = scrollHeight - (scrollTop + clientHeight);
        if (scrollBottom < 50 && !debounceLoading) {
          loadMore();
        }
      }}
    >
      {dataLoading || debounceLoading
        ? SpinComp
        : React.Children.toArray(
            data?.list
              .map(item => <Select.Option value={item.title} children={item.title} />)
              .concat(
                noMore ? (
                  <div
                    style={{
                      textAlign: 'center',
                      fontSize: '14px',
                      color: 'rgb(107,119,133)',
                      padding: 8,
                    }}
                  >
                    没有更多选项了
                  </div>
                ) : (
                  SpinComp
                )
              )
          )}
    </Select>
  );
}

const listService = ({
  page_limit,
  page_num,
  keyword,
}: Record<'page_num' | 'page_limit', number> & { keyword: string }) => {
  console.log({ page_num, page_limit, keyword });
  return new Promise<{ total: number; list: Array<{ id: number; title: string }> }>(resolve => {
    setTimeout(() => {
      const total = 25;
      const offset = (page_num - 1) * page_limit;
      resolve({
        total,
        list: Array.from(Array(Math.min(page_limit, total - offset)), (_, i) => {
          const id = offset + i;
          return {
            id,
            title: `${keyword} ${id}`,
          };
        }),
      });
    }, 1000);
  });
};
