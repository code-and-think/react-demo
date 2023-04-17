import { monaco } from 'react-monaco-editor';
import { isSameOrSubFile } from '../FileTree/utils';

const SCHEMA = 'workspace';
export const getMonacoUri = (fileName: string) => monaco.Uri.parse(`${SCHEMA}://src${fileName}`);

export const createMonacoModel = (content: string | undefined, filePath: string) => {
  return (
    getMonacoModel(filePath) ??
    monaco.editor.createModel(
      content ?? '',
      filePath.endsWith('.json') ? 'json' : 'python',
      getMonacoUri(filePath)
    )
  );
};

export const getMonacoModel = (filePath: string) => {
  return monaco.editor.getModel(getMonacoUri(filePath));
};

export const clearModelState = (path: string) => {
  getAllModels().forEach(item => {
    if (isSameOrSubFile(path, item.uri.path)) {
      item.dispose();
    }
  });
};

export const clearAllModels = () => {
  getAllModels().forEach(item => {
    item.dispose();
  });
};

export const getAllModels = () =>
  monaco.editor.getModels().filter(item => item.uri.scheme === SCHEMA);
