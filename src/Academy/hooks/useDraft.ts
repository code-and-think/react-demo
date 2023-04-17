import { useRequest } from 'ahooks';

import { MLX_CACHE_KEY } from '../constants';
import { clearAllModels } from '../RightSide/monacoUtil';
import { mockCodeTree } from '../util/mockData';

// 如果没传 params 则不发起请求而是取缓存的数据从而实现数据共享
export const useDraft = (params?: { id: string; manual?: boolean }) => {
  return useRequest(mockCodeTree, {
    onSuccess() {
      clearAllModels();
    },
    manual: params?.manual ?? true,
    // 对于不传 params 的，即使手动调用 run/refresh 也不会请求
    ready: params != null,
    cacheKey: MLX_CACHE_KEY.draft,
    cacheTime: -1,
  });
};
