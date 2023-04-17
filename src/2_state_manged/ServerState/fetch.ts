export type ListResp = {
  data: Array<{ id: number; name: string }>;
  total: number;
};
export type ListParams = Record<'page' | 'pageSize', number>;

export const listPageData = ({ page, pageSize }: ListParams): Promise<ListResp> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        total: 100,
        data: Array.from(Array(pageSize), (_, i) => {
          const id = (page - 1) * pageSize + i;
          return {
            id,
            name: `${Date.now()} ${id}`,
          };
        }),
      });
    }, 500);
  });
};
