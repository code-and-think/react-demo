import { Spin } from '@arco-design/web-react';
import { stubFalse, stubTrue } from 'lodash';
import { useParams } from 'react-router-dom';
import LeftSideMenu from './FileTree';
import { getParentPath, replacePath } from './FileTree/utils';
import useFilePath from './hooks/useFilePath';
import usePathStatus from './hooks/usePathStatus';
import usePreventSave from './hooks/usePreventSave';
import { useRootWithSave } from './hooks/useRootWithSave';
import RightSide from './RightSide';
import CodeEditor from './RightSide/CodeEditor';
import CodeTabs from './RightSide/CodeTabs';
import { clearModelState } from './RightSide/monacoUtil';
import { style } from './style';
import './initMonaco';

export default function NextEdit() {
  const { id = '' } = useParams<'id'>();
  const { addUnSavePath, clearUnSavePath, isHighLight, isUnSave, setHighLightPaths } =
    usePathStatus();
  const {
    onDeletePath,
    activeFile,
    setActiveFile,
    setActiveAndOpenFile,
    openedFile,
    setOpenedFile,
  } = useFilePath();

  usePreventSave();

  const { onSaveFileContent, root, onSaveRoot } = useRootWithSave({
    id: Number(id),
    addUnSavePath,
    clearUnSavePath,
  });

  return (
    <div style={{ height: '100%' }} className={style.rewriteArco}>
      {!root ? (
        <Spin />
      ) : (
        <div style={{ display: 'flex', height: '100%' }}>
          <LeftSideMenu
            {...{
              root,
              onSaveRoot: (...args) => {
                console.log({ args });
                onSaveRoot(...args);
              },
              isUnSave,
              setHighLightPaths,
              activeFile,
              setActiveAndOpenFile,
              // 过滤 openFiles 并修改 activeFilePath
              onDelete: delPath => {
                onDeletePath(delPath);
                clearModelState(delPath);
                addUnSavePath(getParentPath(delPath));
              },
              onRename(oldPath, newPath) {
                // 重命名时同步修改已打开的tab名称
                setOpenedFile(paths => paths.map(path => replacePath(path, oldPath, newPath)));
                if (activeFile) {
                  setActiveFile(replacePath(activeFile, oldPath, newPath));
                }
                clearModelState(oldPath);
                addUnSavePath(newPath);
              },
              onAdd(addPath, type) {
                addUnSavePath(addPath);
                // 添加文件完成后直接打开
                if (type === 'file') {
                  setActiveAndOpenFile(addPath);
                }
              },
            }}
          />
          <RightSide
            codeEditor={
              <CodeEditor
                {...{
                  activeFile,
                  setActiveAndOpenFile,
                  onSaveFileContent: onSaveFileContent,
                }}
              />
            }
            codeTabs={
              <CodeTabs
                {...{
                  openedFile,
                  onDeletePath,
                  activeFile,
                  setActiveFile,
                  isUnSave,
                  isHighLight,
                }}
              />
            }
          />
        </div>
      )}
    </div>
  );
}
