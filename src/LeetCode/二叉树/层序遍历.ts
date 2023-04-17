class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

export function minDepth(root: TreeNode | null): number {
  const queue = [{ node: root, depth: 1 }];

  let res = 0;

  while (queue.length) {
    const item = queue.shift();
    if (!item?.node) continue;

    const { node, depth } = item;
    if (!node?.left && !node?.right) {
      res = depth;
      break;
    }
    queue.push({ node: node.left, depth: depth + 1 });
    queue.push({ node: node.right, depth: depth + 1 });
  }

  return res;
}

function levelOrderBottom(root: TreeNode | null): number[][] {
  const res: number[][] = [];
  const queue = [{ node: root, index: 0 }];

  while (queue.length) {
    const item = queue.shift();
    if (item?.node) {
      const { node, index } = item;
      res[index] = res[index] ?? [];
      res[index].push(node.val);
      queue.push({ node: node.left, index: index + 1 });
      queue.push({ node: node.right, index: index + 1 });
    }
  }

  return res.reverse();
}
