interface CodeTree {
  // 文件节点不存在该属性
  children?: Array<CodeTree>;
  // 文件夹节点不存在该属性
  content?: string;
  title: string;
}
