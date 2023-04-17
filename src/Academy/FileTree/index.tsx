import { Layout, Spin } from '@arco-design/web-react';
import { css } from '@emotion/css';
import { useLocalStorageState } from 'ahooks';
import { useRef } from 'react';
import { useDraft } from '../hooks/useDraft';
import useFileTree, { CodeTreeProps } from './Tree';
import useSearch from './useSearch';

const minWidth = 255;

export default function LeftSideMenu(props: CodeTreeProps) {
  const { keyword, SearchInput, SearchResult } = useSearch();
  const codeTree = useFileTree(props);
  const sideRef = useRef<HTMLDivElement>(null);
  const [sideWidth, setSideWidth] = useLocalStorageState('SideResizeState', {
    defaultValue: minWidth,
    deserializer: Number,
    serializer: String,
  });
  const { loading } = useDraft();

  return (
    <Spin loading={loading}>
      <Layout.Sider
        resizeDirections={['right']}
        ref={sideRef}
        resizeBoxProps={{
          // 不用 onMove 去获取宽度是因为传了 onMove 会强制变成受控模式
          onMovingEnd() {
            if (sideRef.current) {
              setSideWidth(sideRef.current.clientWidth);
            }
          },
          resizeTriggers: {
            right: (
              <div
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  height: '100%',
                  width: 6,
                  borderLeft: '2px solid var(--color-border)',
                }}
              />
            ),
          },
        }}
        className={css({
          minWidth: minWidth,
          // 让横向的 resizeBox 可见
          overflow: 'visible',
          height: '100%',
          '.arco-layout-sider-children': {
            display: 'flex',
            flexDirection: 'column',
          },
        })}
        width={sideWidth}
      >
        <div style={{ margin: 6 }}>{SearchInput}</div>
        <div style={{ flex: 1, height: 0, overflow: 'auto' }}>
          {keyword ? SearchResult : codeTree}
        </div>
      </Layout.Sider>
    </Spin>
  );
}
