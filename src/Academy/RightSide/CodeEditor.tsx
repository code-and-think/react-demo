import { css } from '@emotion/css';
import { useMount, usePrevious } from 'ahooks';
import { useEffect, useRef } from 'react';
import MonacoEditor, { monaco } from 'react-monaco-editor';
import { useEmitter } from '../util/useEmitter';
import { UseFilePathRes } from '../hooks/useFilePath';
import { UseRootWithSaveRes } from '../hooks/useRootWithSave';
import { getMonacoModel } from './monacoUtil';

type CodeEditorProps = Pick<UseRootWithSaveRes, 'onSaveFileContent'> &
  Pick<UseFilePathRes, 'activeFile' | 'setActiveAndOpenFile'>;

export default function CodeEditor({
  onSaveFileContent,
  activeFile,
  setActiveAndOpenFile,
}: CodeEditorProps) {
  const editorInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  const viewStateRef = useRef(
    {} as Record<string, monaco.editor.ICodeEditorViewState | null | undefined>
  );

  const prevActive = usePrevious(activeFile);
  useEmitter('JumpToModel', ({ filePath, range }) => {
    const editor = editorInstanceRef.current;
    if (editor) {
      const onSelect = () => {
        editor.setSelection(range);
        editor.revealRangeInCenter(range);
        editor.focus();
      };
      if (activeFile === filePath) {
        onSelect();
      } else {
        setActiveAndOpenFile(filePath);
        const { dispose } = editor.onDidChangeModel(() => {
          onSelect();
          dispose();
        });
      }
    }
  });
  // 当切换tab时通过修改 editorInstance 的 model 来切换展示的代码
  useEffect(() => {
    // 当没有任何 tab 打开时，fileName 为 undefined
    const editor = editorInstanceRef.current;
    if (editor && activeFile) {
      if (prevActive) {
        viewStateRef.current[prevActive] = editor.saveViewState();
      }
      editor.setModel(getMonacoModel(activeFile));
    }
  }, [activeFile]);

  useMount(() => {
    const editor = editorInstanceRef.current;
    editor?.onDidChangeModel(({ newModelUrl }) => {
      const vs = newModelUrl?.path && viewStateRef.current[newModelUrl.path];
      if (vs) {
        editor.restoreViewState(vs);
        editor.focus();
      }
    });
  });

  return (
    <MonacoEditor
      theme="vs-light"
      editorDidMount={editorInstance => {
        editorInstanceRef.current = editorInstance;
      }}
      language="python"
      onChange={() => {
        const path = editorInstanceRef.current?.getModel()?.uri.path;
        if (path) {
          onSaveFileContent(path);
        }
      }}
      className={css(!activeFile && { display: 'none' })}
      options={{
        fontSize: 14,
        automaticLayout: true,
      }}
    />
  );
}
