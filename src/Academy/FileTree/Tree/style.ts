import { css } from '@emotion/css';

const dotMenu = css({
  visibility: 'hidden',
});

export const style = {
  codeTree: css({
    overflow: 'auto',
    height: '100%',
    '.arco-tree-node-indent-block': {
      marginRight: 0,
    },
    '.arco-tree-node-title': {
      padding: '4px 0',
    },
    '.arco-tree-node-selected .arco-tree-node-title': {
      color: 'inherit',
    },
    // hover颜色修改
    '.arco-tree-node': {
      '.arco-tree-node-title:hover': {
        backgroundColor: 'transparent',
      },
      '&-selected': {
        backgroundColor: '#e4e6f0',
      },
      '&:hover': {
        backgroundColor: '#e4e6f0',
        '.Dot_svg__icon': { visibility: 'hidden' },
        [`.${dotMenu}`]: { visibility: 'visible' },
      },
    },
    // 文件之间不显示连接线
    '.arco-tree-node-is-leaf:not(.arco-tree-node-is-tail) .arco-tree-node-indent::after': {
      content: 'none',
    },
    '.arco-tree-node-indent-block::before': {
      display: 'initial',
    },
    [`.arco-tree-node-switcher`]: {
      display: 'none',
    },
  }),
  dotMenu,
};
