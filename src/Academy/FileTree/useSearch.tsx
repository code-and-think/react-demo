import { Empty, Input, Tree, Typography } from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';
import { css } from '@emotion/css';
import { compact, last, xor } from 'lodash';
import { ReactNode, useEffect, useState } from 'react';
import { useEmitter } from '../util/useEmitter';
import { getAllModels } from '../RightSide/monacoUtil';

export default function useSearch() {
  const [keyword, setKeyword] = useState('');
  const [treeNodes, setTreeNodes] = useState<Array<ReactNode>>();
  const [expendedKeys, setExpendedKeys] = useState([] as string[]);
  const emitJumpToModel = useEmitter('JumpToModel');

  useEffect(() => {
    const allExpended: string[] = [];
    setTreeNodes(
      compact(
        getAllModels().map(model => {
          const matches = model.findMatches(keyword, false, false, false, null, true);
          if (!matches.length) {
            return null;
          } else {
            const subMenuKey = model.uri.path;
            allExpended.push(subMenuKey);

            return (
              <Tree.Node key={subMenuKey} title={last(model.uri.path.split('/'))}>
                {matches.map(match => {
                  const range = match.range;
                  // 获取该行内容
                  const lineContent = model?.getLineContent(range.startLineNumber) ?? '';
                  // 获取搜索内容在该行位置的前缀
                  const lineStartColumn = range.startColumn < 24 ? 1 : range.startColumn - 24;

                  return (
                    <Tree.Node
                      key={[model.uri.path, JSON.stringify(range)].join('/')}
                      title={
                        <Typography.Text
                          style={{ margin: 0 }}
                          type="secondary"
                          ellipsis={{ cssEllipsis: true }}
                        >
                          {lineContent.slice(lineStartColumn - 1, range.startColumn - 1)}
                          <span
                            style={{ background: '#e4bda9' }}
                            children={lineContent.slice(range.startColumn - 1, range.endColumn - 1)}
                          />
                          {lineContent.slice(range.endColumn - 1)}
                        </Typography.Text>
                      }
                    />
                  );
                })}
              </Tree.Node>
            );
          }
        })
      )
    );
    setExpendedKeys(allExpended);
  }, [keyword]);

  return {
    keyword,
    SearchInput: <Input placeholder="搜索文件内容" value={keyword} onChange={setKeyword} />,
    SearchResult: !treeNodes ? (
      <div />
    ) : !treeNodes.length ? (
      <Empty description="未找到结果" />
    ) : (
      <Tree
        className={css({
          '.arco-tree-node-switcher': {
            marginRight: 6,
            width: 12,
            fontSize: 12,
          },
          '.arco-tree-node-is-leaf .arco-tree-node-switcher': {
            display: 'none',
          },
          '.arco-tree-node': {
            '.arco-tree-node-title': {
              width: 0,
              '&:hover': {
                backgroundColor: 'transparent',
              },
            },
            '.arco-icon-hover:hover::before': {
              backgroundColor: 'transparent',
            },
            '&:hover': {
              backgroundColor: '#e4e6f0',
            },
          },
        })}
        icons={{ switcherIcon: <IconDown /> }}
        expandedKeys={expendedKeys}
        onExpand={setExpendedKeys}
        selectedKeys={[]}
        blockNode
        onSelect={(selectedKeys, { node }) => {
          if (node.props.childrenData?.length) {
            setExpendedKeys(xor(expendedKeys, selectedKeys));
          } else if (node.key) {
            const arr = (node.key as string).split('/');
            emitJumpToModel({
              filePath: arr.slice(0, -1).join('/'),
              range: JSON.parse(last(arr)!),
            });
          }
        }}
      >
        {treeNodes}
      </Tree>
    ),
  };
}
