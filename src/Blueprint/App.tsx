import { Dropdown, Menu, Message, Spin, Tooltip } from '@arco-design/web-react';
import ContextMenu from '@arco-materials/context-menu';
import { Node, useViewport } from 'react-flow-renderer';
import { css } from '@emotion/css';
import { Format } from '@icon-park/react';
import { useLocalStorageState, useToggle } from 'ahooks';
import { useRef, useState } from 'react';
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  ControlButton,
  Controls,
  EdgeRemoveChange,
  MiniMap,
  updateEdge,
} from 'react-flow-renderer';
import { edgeTypes } from './EdgeType';
import useBluePrint, { BlueprintContext } from './hooks';
import { AddParam } from './hooks/useNodeAction';
import { nodeTypes } from './NodeType';
import { getUniqueId, useOffsetPosToFlowPos } from './util';
import { createEdge } from './util/edge';

export type DAGNode = {
  work_name: string;
  is_io: boolean;
  is_required: boolean;
  des?: string;
  id: string;
};

export type DAGEdge = {
  source: DAGNode['id'];
  target: DAGNode['id'];
};

type ConnectState = 'start' | 'end' | 'click' | 'init';

export default function BluePrint() {
  const values = useBluePrint();
  const {
    edges,
    nodes,
    loading,
    setNodes,
    setEdges,
    addEdges,
    onLayout,
    hasSelected,
    flowRef,
    removeEdges,
    addNodes,
    removeNodes,
    addNewNode,
  } = values;
  const [copyNodes, copy] = useLocalStorageState('blueprint.clipboard', {
    defaultValue: [],
    deserializer(value) {
      return JSON.parse(value);
    },
    serializer(value: Array<Node<DAGNode>>) {
      return JSON.stringify(value);
    },
  });
  const toPosition = useOffsetPosToFlowPos();
  const [selectedMenu, noSelectedMenu] = [
    [
      {
        key: '1',
        type: 'item',
        text: '复制',
        onClick() {
          const selectedNodes = nodes.filter(item => item.selected);

          copy(selectedNodes);
        },
      },
    ],
    [
      {
        key: '1',
        type: 'item',
        text: '粘贴',
        onClick() {
          addNodes(
            copyNodes.map(item => ({
              ...item,
              id: getUniqueId(),
              position: positionRef.current,
            })),
            'undo',
            true
          );
        },
      },
    ],
  ];
  const [contextMenuItems, setContextMenuItems] = useState(noSelectedMenu);
  const { x, y, zoom } = useViewport();
  const [connectState, setConnectState] = useState<ConnectState>('init');
  const dropdownRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<any>();
  const addParamsRef = useRef<AddParam>({
    position: { x: -1, y: -1 },
    nodeId: '',
    handleType: 'source',
  });
  const positionRef = useRef({ x: -1, y: -1 });

  return (
    <BlueprintContext.Provider value={values}>
      <Spin
        loading={loading}
        className={css({
          width: '100%',
          height: '100%',
          '.arco-spin-children': { height: '100%' },
        })}
      >
        <Dropdown
          droplist={
            <Menu
              ref={dropdownRef}
              children={[
                {
                  key: '1',
                  text: '新增节点',
                  onClick: () => {
                    setConnectState('init');
                    addNewNode(addParamsRef.current);
                  },
                },
              ].map(item => (
                <Menu.Item key={item.key} children={item.text} onClick={item.onClick} />
              ))}
            />
          }
          triggerProps={{ alignPoint: true }}
          trigger="click"
          popupVisible={connectState === 'end'}
        >
          <ContextMenu
            triggerProps={{ style: { userSelect: 'none' } }}
            onVisibleChange={visible => {
              if (visible) {
                setContextMenuItems(hasSelected ? selectedMenu : noSelectedMenu);
              }
            }}
            onClickItem={key => {
              contextMenuItems.find(item => item.key === key)?.onClick();
            }}
            items={contextMenuItems as any}
          >
            <ReactFlow
              onContextMenu={event => (positionRef.current = toPosition(event))}
              ref={flowRef}
              edges={edges}
              nodes={nodes}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              // "position" | "remove" | "select" | "reset" | "dimensions" | "add"
              // remove: 删除节点时触发，而且与该节点关联的边也会被自动删除
              onNodesChange={
                // 当多选的时候 changes 会传入数组
                changes => {
                  switch (changes[0].type) {
                    case 'remove':
                      return removeNodes(
                        (changes as Array<EdgeRemoveChange>).map(change => change.id),
                        'undo',
                        true
                      );
                    default:
                      setNodes(nodes => applyNodeChanges(changes, nodes));
                  }
                }
              }
              //  "select" | "remove" | "add" | "reset"
              // select: 选中/点击空白取消选中时都会触发，selected在选中时为 true，取消选中时为 false
              // 这里的 add 指的不是连接边，连接边的时候触发的是 onConnect
              onEdgesChange={changes => {
                switch (changes[0].type) {
                  case 'remove': {
                    return removeEdges(
                      (changes as Array<EdgeRemoveChange>).map(change => change.id),
                      'undo',
                      true
                    );
                  }
                  default: {
                    setEdges(edges => applyEdgeChanges(changes, edges));
                  }
                }
              }}
              onClick={event => {
                setConnectState(prevState => {
                  switch (prevState) {
                    // 拖拽时至空白时展示菜单
                    case 'start':
                      addParamsRef.current = {
                        ...addParamsRef.current,
                        position: toPosition(event),
                      };
                      return 'end';
                    // 没有前置 connect start: 重复 init
                    // 有前置 connect start: 变为 click
                    case 'init':
                      return timeoutRef.current == null ? 'init' : 'click';
                    // 再次点击空白关闭菜单
                    default:
                      return 'init';
                  }
                });
              }}
              // 开始连接时触发
              onConnectStart={(_event, params) => {
                const { nodeId, handleType } = params!;
                addParamsRef.current = {
                  ...addParamsRef.current,
                  nodeId: nodeId!,
                  handleType: handleType!,
                };
                timeoutRef.current = setTimeout(() => {
                  timeoutRef.current = undefined;
                  setConnectState(prevState => {
                    switch (prevState) {
                      case 'init':
                        return 'start';
                      default:
                        return 'init';
                    }
                  });
                }, 50);
              }}
              // onConnectEnd 连接结束时触发，但必须是新增的线，已有的线的更新触发的事 update（不管是链接到空白还是节点）
              // 链接到其他节点而不是空白处时触发（优先于 connect end）
              onConnect={connection => {
                const newEdge = createEdge(connection);
                if (edges.some(edge => edge.id === newEdge.id)) {
                  return Message.error('连线重复');
                }
                addEdges([newEdge], 'undo', true);

                setConnectState('init');
              }}
              // 直接捏住连线的首端或者末端可以修改连线的 source / target
              onEdgeUpdate={(oldEdge, newConnection) => {
                setEdges(els => updateEdge(oldEdge, newConnection, els));
                setConnectState('init');
              }}
            >
              <MiniMap nodeBorderRadius={2} nodeColor="rgb(100 159 210)" />
              <Controls>
                <Tooltip content="自动布局">
                  <ControlButton
                    onClick={() => {
                      onLayout();
                    }}
                  >
                    <Format theme="outline" size="24" fill="#333" />
                  </ControlButton>
                </Tooltip>
              </Controls>
              <Background color="#aaa" gap={60} variant={BackgroundVariant.Lines} />
            </ReactFlow>
          </ContextMenu>
        </Dropdown>
      </Spin>
    </BlueprintContext.Provider>
  );
}
