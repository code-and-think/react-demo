import { Tree } from '@arco-design/web-react';
import { IconFile } from '@arco-design/web-react/icon';
import { cx, css } from '@emotion/css';
import { uniq, xor, stubFalse, isEqual } from 'lodash';
import { useState, useRef, useEffect, ReactNode, createElement } from 'react';
import { UseFilePathRes } from '../../hooks/useFilePath';
import { UsePathStatusRes } from '../../hooks/usePathStatus';
import useLatestVersion from '../../hooks/useVersionList';
import { createMonacoModel } from '../../RightSide/monacoUtil';
import {
  fileClassName,
  dirClassName,
  isFileNode,
  HighLightColor,
  isSameOrSubFile,
  replacePath,
} from '../utils';
import NodeTitleAndMenu, { NodeTitleAndMenuProps } from './NodeTitleAndMenu';
import { style } from './style';
import { ReactComponent as IconFolder } from './Folder.svg';
import { ReactComponent as IconFolderOpen } from './FolderOpen.svg';
import { UseRootWithSaveRes } from '../../hooks/useRootWithSave';

export type CodeTreeProps = {
  root: NonNullable<UseRootWithSaveRes['root']>;
  onSaveRoot: UseRootWithSaveRes['onSaveRoot'];
  onRename: (oldPath: string, newPath: string) => void;
  onDelete: (path: string) => void;
  onAdd: (path: string, type: 'file' | 'directory') => void;
} & Pick<UsePathStatusRes, 'setHighLightPaths' | 'isUnSave'> &
  Pick<UseFilePathRes, 'setActiveAndOpenFile' | 'activeFile'>;

export default function useFileTree({
  root,
  onSaveRoot,
  activeFile,
  setActiveAndOpenFile,
  onAdd,
  onDelete,
  onRename,
  isUnSave,
  setHighLightPaths,
}: CodeTreeProps) {
  const [expandedPaths, _setExpandedPaths] = useState([`/${root.title}`] as string[]);
  const setExpandedPaths: typeof _setExpandedPaths = newValue => {
    _setExpandedPaths(uniq(typeof newValue === 'function' ? newValue(expandedPaths) : newValue));
  };
  const [addingInfo, setAddingInfo] = useState<
    { path: string; type: 'file' | 'directory' } | undefined
  >();
  const treeRef = useRef<Tree>(null);
  const { latestVersion: latestVersionRoot } = useLatestVersion();
  const newHighLightPaths = [] as string[];

  useEffect(() => {
    setHighLightPaths(oldVal => {
      return isEqual(oldVal, newHighLightPaths) ? oldVal : newHighLightPaths;
    });
  });

  // 点击文件时自动展开其所有父文件夹
  useEffect(() => {
    if (activeFile) {
      const chunks = activeFile.split('/');
      setExpandedPaths(
        expandedPaths.concat(
          chunks.reduce((pre, _, index) => {
            // 从第二个到倒数第二个
            return index > 0 && index < chunks.length - 1
              ? pre.concat(chunks.slice(0, index + 1).join('/'))
              : pre;
          }, [] as string[])
        )
      );
      treeRef.current?.scrollIntoView(activeFile);
    }
  }, [activeFile]);

  return (
    <div
      style={{ height: '100%' }}
      onClick={e => {
        const propagatePath = e.nativeEvent.composedPath();
        let lookedTreeNode = false;
        for (const item of propagatePath) {
          if (lookedTreeNode) return;
          (item as HTMLElement).classList?.forEach(classItem => {
            if (classItem === 'arco-tree-node') {
              lookedTreeNode = true;
            }
            if (lookedTreeNode) {
              if (classItem.startsWith(fileClassName)) {
                const key = classItem.slice(fileClassName.length);
                if (key) setActiveAndOpenFile(key);
              } else if (classItem.startsWith(dirClassName)) {
                const key = classItem.slice(dirClassName.length);
                if (key) setExpandedPaths(xor(expandedPaths, [key]));
              }
            }
          });
        }
      }}
    >
      <Tree
        showLine
        ref={treeRef}
        className={style.codeTree}
        autoExpandParent={false}
        expandedKeys={expandedPaths}
        onExpand={setExpandedPaths}
        selectedKeys={activeFile == undefined ? undefined : [activeFile]}
      >
        {
          (function genTreeNode({
            node,
            onNodeChange,
            onNodeDelete,
            parentPath,
            // 当前节点在重命名时，校验是否有重名的兄弟节点需要文件夹父级提供
            editingTitleParams: { type, checkNameExist } = {
              type: 'rename',
              checkNameExist: stubFalse,
            },
            latestVersionNode,
          }: {
            node: CodeTree;
            onNodeChange: (newNode: CodeTree) => void;
            parentPath: string;
            onNodeDelete?: () => void;
            editingTitleParams?: Pick<NodeTitleAndMenuProps['onRename'], 'checkNameExist' | 'type'>;
            latestVersionNode: CodeTree | undefined;
          }) {
            const getPath = (title: string) => [parentPath, title].join('/');
            const currentPath = getPath(node.title);
            const checkIsExist = (newValue: string) => {
              return node.children?.some(item => item.title === newValue) ?? false;
            };
            const isFile = isFileNode(node);
            let isDiff: boolean | undefined;
            let childNodes: ReactNode;
            if (type === 'add') {
              isDiff = false;
            } else if (isFile) {
              createMonacoModel(node.content, currentPath);
              isDiff =
                latestVersionRoot &&
                // 重命名
                (node.title !== latestVersionNode?.title ||
                  // 内容修改
                  node.content !== latestVersionNode?.content);
            } else {
              const childrenRes = node.children?.map((item, index) =>
                genTreeNode({
                  node: item,
                  parentPath: currentPath,
                  editingTitleParams: {
                    type: 'rename',
                    checkNameExist: newTitle => newTitle !== item.title && checkIsExist(newTitle),
                  },
                  // 不能对 index 取因为可能出现新增/删除，改成对 title 取
                  latestVersionNode: latestVersionNode?.children?.find(
                    latestItem => latestItem.title === item.title
                  ),
                  onNodeChange: newNode => {
                    onNodeChange({
                      ...node,
                      children: node.children?.map((item, i) => (index === i ? newNode : item)),
                    });
                  },
                  onNodeDelete: () => {
                    onNodeChange({
                      ...node,
                      children: node.children?.filter(_item => _item !== item),
                    });
                  },
                })
              ) as Array<{ node: ReactNode; isDiff: boolean }> | undefined;
              isDiff =
                latestVersionRoot &&
                // 文件夹改名
                (node.title !== latestVersionNode?.title ||
                  // 子文件发生删除 / 新增
                  node.children?.length !== latestVersionNode?.children?.length ||
                  // 子文件的内容发生改变
                  childrenRes?.some(item => item.isDiff));
              childNodes = childrenRes?.map(item => item.node);
            }
            if (Boolean(isDiff)) {
              newHighLightPaths.push(currentPath);
            }

            return {
              isDiff,
              node: (
                <Tree.Node
                  // ref属性传回调不生效所以通过下面的 NodeTitle 获取
                  blockNode
                  key={node.title && currentPath}
                  className={cx(
                    `${node.children ? dirClassName : fileClassName}${node.title && currentPath}`,
                    isDiff &&
                      css({
                        '.arco-tree-node-title': {
                          color: `${HighLightColor} !important`,
                        },
                      })
                  )}
                  title={
                    <NodeTitleAndMenu
                      key={node.title}
                      title={node.title}
                      unSaved={isUnSave(currentPath)}
                      iconNode={
                        isFile ? (
                          <IconFile style={{ width: 18, height: 18 }} />
                        ) : (
                          createElement(
                            expandedPaths.includes(currentPath) ? IconFolderOpen : IconFolder,
                            {
                              style: { width: 18, height: 18 },
                            }
                          )
                        )
                      }
                      onAdd={
                        isFile
                          ? undefined
                          : type => {
                              setAddingInfo({ path: currentPath, type });
                              // 打开相应文件夹
                              if (!isFile) {
                                setExpandedPaths(expandedPaths.concat(currentPath));
                              }
                            }
                      }
                      onDelete={
                        onNodeDelete &&
                        (() => {
                          onNodeDelete();
                          setExpandedPaths(paths =>
                            paths.filter(item => !isSameOrSubFile(currentPath, item))
                          );
                          onDelete(currentPath);
                        })
                      }
                      onRename={{
                        type,
                        checkNameExist,
                        onFinish: newTitle => {
                          if (type === 'rename') {
                            if (newTitle !== node.title) {
                              onNodeChange({ ...node, title: newTitle });
                              const newPath = getPath(newTitle);

                              setExpandedPaths(paths =>
                                paths.map(path => replacePath(path, currentPath, newPath))
                              );
                              onRename(currentPath, newPath);
                            }
                          } else if (type === 'add' && addingInfo) {
                            if (newTitle) {
                              onNodeChange({ ...node, title: newTitle });
                            }
                            setAddingInfo(undefined);
                          }
                        },
                      }}
                    />
                  }
                >
                  {addingInfo &&
                    addingInfo.path === currentPath &&
                    genTreeNode({
                      node: {
                        title: '',
                        ...(addingInfo.type === 'file' ? { content: '' } : { children: [] }),
                      },
                      editingTitleParams: { type: 'add', checkNameExist: checkIsExist },
                      latestVersionNode: undefined,
                      parentPath: currentPath,
                      onNodeChange(newNode) {
                        onNodeChange({
                          ...node,
                          children: node.children
                            ?.concat(newNode)
                            .sort((a, b) =>
                              a.title.toLowerCase() > b.title.toLocaleLowerCase() ? 1 : -1
                            ),
                        });

                        onAdd(getPath([node.title, newNode.title].join('/')), addingInfo.type);
                      },
                    }).node}
                  {childNodes}
                </Tree.Node>
              ),
            };
          })({
            node: root,
            parentPath: '',
            // 修改名称 / 添加文件 / 添加文件夹
            onNodeChange: onSaveRoot,
            // 根文件夹不能删除所以不传 onDelete
            latestVersionNode: latestVersionRoot,
          }).node
        }
      </Tree>
    </div>
  );
}
