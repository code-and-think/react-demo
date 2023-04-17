import { Tabs } from '@arco-design/web-react';
import { css } from '@emotion/css';
import { last } from 'lodash';
import { cloneElement } from 'react';
import { HighLightColor } from '../FileTree/utils';
import { UseFilePathRes } from '../hooks/useFilePath';
import { UsePathStatusRes } from '../hooks/usePathStatus';

export type CodeTabsProps = Pick<UsePathStatusRes, 'isUnSave' | 'isHighLight'> &
  Pick<UseFilePathRes, 'activeFile' | 'setActiveFile' | 'onDeletePath' | 'openedFile'>;

export default function CodeTabs({
  activeFile,
  setActiveFile,
  onDeletePath,
  openedFile,
  isUnSave,
  isHighLight
}: CodeTabsProps) {
  return (
    <Tabs
      editable
      type="card"
      addButton={<div />}
      className={css({
        flex: 1,
        userSelect: 'none',
        '.arco-tabs-header-title': {
          background: '#ececec'
        },
        '.arco-tabs-header-title-active': {
          background: '#fff !important',
          transition: 'none',
          fontWeight: 'normal'
        }
      })}
      activeTab={activeFile}
      onChange={setActiveFile}
      onDeleteTab={onDeletePath}
      renderTabTitle={(node, { key }: any) => {
        return cloneElement(node as any, {
          className: `${(node as any).props.className}  ${css(
            {
              '.arco-tabs-icon-hover::before': {
                transition: 'none'
              }
            },
            isUnSave(key) && {
              '.arco-tabs-icon-hover:not(:hover)::before': {
                width: 10,
                height: 10,
                zIndex: 1,
                background: '#333333'
              }
            },
            isHighLight(key) && {
              color: HighLightColor,
              '&:hover': {
                color: HighLightColor
              }
            }
          )}`
        });
      }}
    >
      {openedFile.map(path => {
        return <Tabs.TabPane key={path} title={last(path.split('/'))} />;
      })}
    </Tabs>
  );
}
