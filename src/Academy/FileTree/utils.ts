export const HighLightColor = '#e8a93c';

export const [dirClassName, fileClassName] = ['__directory__', '__file__'];
export const isSameOrSubFile = (dirPath: string, filePath: string) => {
  return dirPath === filePath || (filePath.startsWith(dirPath) && filePath[dirPath.length] === '/');
};

export const getParentPath = (path: string) => {
  return path.split('/').slice(0, -1).join('/');
};

export const replacePath = (path: string, oldPath: string, newPath: string) => {
  if (isSameOrSubFile(oldPath, path)) {
    return `${newPath}${path.slice(oldPath.length)}`;
  }
  return path;
};

export const isFileNode = (node: CodeTree) => {
  return !node.children;
};
