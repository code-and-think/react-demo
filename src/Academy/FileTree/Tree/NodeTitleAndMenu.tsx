import { Dropdown, Input, Menu, TooltipProps, Typography } from '@arco-design/web-react';
import { RefInputType } from '@arco-design/web-react/es/Input/interface';
import { IconMoreVertical } from '@arco-design/web-react/icon';
import { css } from '@emotion/css';
import { useBoolean, useClickAway } from 'ahooks';
import { over } from 'lodash';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { ReactComponent as IconDot } from './Dot.svg';
import { style } from './style';

export type NodeTitleAndMenuProps = {
  iconNode: ReactNode;
  title: string;
  onDelete?: () => void;
  onAdd?: (type: 'file' | 'directory') => void;
  onRename: Pick<EditingTitleProps['typeParams'], 'type'> &
    Pick<EditingTitleProps, 'checkNameExist' | 'onFinish'>;
  unSaved?: boolean;
};

export default function NodeTitleAndMenu({
  iconNode,
  title,
  onAdd,
  onDelete,
  unSaved = false,
  onRename: { type, onFinish: onRenameFinish, checkNameExist },
}: NodeTitleAndMenuProps) {
  const [editing, { setTrue: startEdit, setFalse: stopEdit }] = useBoolean();

  return (
    <div style={{ userSelect: 'none', display: 'flex', alignItems: 'center', columnGap: 3 }}>
      {iconNode}
      <EditableTitle
        typeParams={type === 'rename' ? { type: 'rename', editing, title } : { type: 'add' }}
        checkNameExist={checkNameExist}
        onFinish={newTitle => {
          onRenameFinish(newTitle);
          stopEdit();
        }}
      />
      {type === 'rename' && (
        <>
          <Dropdown
            droplist={
              <Menu>
                <Menu.Item
                  key="重命名"
                  onClick={() => {
                    setTimeout(startEdit, 0);
                  }}
                >
                  重命名
                </Menu.Item>
                {onAdd && (
                  <>
                    <Menu.Item key="新增文件" onClick={() => onAdd('file')}>
                      新增文件
                    </Menu.Item>
                    <Menu.Item key="新增文件夹" onClick={() => onAdd('directory')}>
                      新增文件夹
                    </Menu.Item>
                  </>
                )}
                {onDelete && (
                  <Menu.Item key="删除" onClick={onDelete}>
                    删除
                  </Menu.Item>
                )}
              </Menu>
            }
          >
            <IconMoreVertical
              fontSize={18}
              className={`${style.dotMenu} ${css({
                marginRight: 3,
                '&.arco-dropdown-popup-visible': {
                  visibility: 'visible',
                  '+ .Dot_svg__icon': { visibility: 'hidden' },
                },
              })}`}
            />
          </Dropdown>
          {unSaved && (
            <IconDot
              className="Dot_svg__icon"
              fontSize={13}
              style={{ position: 'absolute', right: 5 }}
            />
          )}
        </>
      )}
    </div>
  );
}

export type EditingTitleProps = {
  typeParams:
    | { type: 'rename'; editing: boolean /* 非新增文件时，editing 状态由外界控制 */; title: string }
    | { type: 'add' /* 新增文件时，editing 状态由内部控制 */ };
  checkNameExist: (newValue: string) => boolean;
  onFinish: (newValue: string) => void;
};

export const EditableTitle = ({
  typeParams,
  checkNameExist,
  onFinish: onFinishEdit,
}: EditingTitleProps) => {
  const [innerEditing, { setFalse: stopEdit }] = useBoolean(true);
  const [warning, setWarning] = useState('');
  const { editing, type, title, onEnd } =
    typeParams.type === 'rename'
      ? {
          ...typeParams,
          onEnd: (cancel = false) => {
            cancel = cancel || Boolean(warning);
            over(onFinishEdit, setCurTitle)(cancel ? title : curTitle);
            setWarning('');
          },
        }
      : {
          ...typeParams,
          editing: innerEditing,
          title: '',
          onEnd: (cancel = false) => {
            stopEdit();
            cancel = cancel || Boolean(warning);
            onFinishEdit(cancel ? '' : curTitle);
            setWarning('');
          },
        };
  const [curTitle, setCurTitle] = useState(title);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<RefInputType>(null);

  useClickAway(() => onEnd(), ref);

  useEffect(() => {
    const dom = inputRef.current?.dom;
    if (editing && dom && dom.value) {
      dom.selectionStart = 0;
      const lastDotIndex = dom.value.lastIndexOf('.');
      dom.selectionEnd = lastDotIndex === -1 ? dom.value.length : lastDotIndex;
    }
  }, [editing]);

  return (
    <div
      className={css({
        flex: 1,
        width: 0,
        '.arco-typography': {
          margin: '0px',
          color: 'inherit ',
          '.arco-typography-operation-edit': { display: 'none' },
        },
      })}
    >
      {editing ? (
        <div style={{ position: 'relative' }} ref={ref}>
          <Input
            value={curTitle}
            onKeyDown={e => {
              if (e.key === 'Escape') {
                onEnd(true);
              } else if (e.key === 'Enter') {
                onEnd();
              }
            }}
            autoFocus
            ref={inputRef}
            style={{
              borderRadius: 0,
              height: 22,
              lineHeight: 9,
              padding: '3px 1px',
              ...(warning && { border: '1px solid rgb(174, 41, 24)' }),
            }}
            onChange={value => {
              setCurTitle(value);
              if (value === '' && type === 'rename') {
                setWarning('必须提供文件或文件名称');
              } else if (checkNameExist(value)) {
                setWarning('已存在同名文件或文件夹');
              } else if (value.includes('/')) {
                setWarning('包含非法字符 "/" ');
              } else {
                setWarning('');
              }
            }}
          />
          {warning && (
            <div
              style={{
                position: 'absolute',
                background: '#fcede9',
                color: '#616161',
                width: '100%',
                zIndex: 1,
                border: '1px solid rgb(174, 41, 24)',
                borderTop: 'none',
              }}
            >
              {warning}
            </div>
          )}
        </div>
      ) : (
        <Typography.Text
          ellipsis={{
            // 开启 cssEclipse 后，如果一开始的 eclipseStatus == false 的话后续就再不会有折叠功能了
            showTooltip: {
              type: 'tooltip',
              props: {
                position: 'right',
                style: { marginLeft: '30px' },
              } as TooltipProps,
            },
          }}
        >
          {curTitle}
        </Typography.Text>
      )}
    </div>
  );
};
