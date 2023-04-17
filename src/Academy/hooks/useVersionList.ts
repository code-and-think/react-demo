import { useRequest } from 'ahooks';

import { MLX_CACHE_KEY } from '../constants';
import { mockCodeTree } from '../util/mockData';


// 内部所有请求的参数都由 params 传入，所以要保证当没有传 params 时不得调用 run/runAsync
export default function useLatestVersion(params?: { id: number; manual?: boolean }) {
  const { data: latestVersion } = useRequest(mockCodeTree, {
    ready: params != null,
    manual: params?.manual ?? true,
    cacheKey: MLX_CACHE_KEY.latestVersion,
    cacheTime: -1,
  });

  return {
    latestVersion,
  };
}
