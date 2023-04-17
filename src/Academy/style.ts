import { css } from '@emotion/css';

export const style = {
  rewriteArco: css({
    background: '#f8f9fa',
    '*::-webkit-scrollbar': {
      display: 'none',
    },
    // rewrite arco global style
    '.arco-spin': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    '.arco-spin-children': {
      height: '100%',
    },

    // 在不包裹 children 且不传 tip 时给 arco-spin 添加 text-align:center
    '.arco-spin-icon': {
      textAlign: 'center',
    },

    '.arco-tree-node': {
      paddingLeft: 12,
    },

    '.arco-empty': {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    },
  }),
};
