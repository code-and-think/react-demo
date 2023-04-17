/**
 * // Definition for a Node.
 * function Node(val,left,right) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 * };
 */
export {};
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

function treeToDoublyList(root: TreeNode | null) {
  // 转换为一个排序的双向链表，不能创建任何新的节点，只能调整树中指针的指向
  // 左指针指向前一个节点，右指针指向后一个节点

  function __transform(node: TreeNode | null): [TreeNode | null, TreeNode | null] {
    if (!node) return [node, node];
    const [leftHead, leftTail] = __transform(node.left);
    const [rightHead, rightTail] = __transform(node.right);

    if (leftTail) {
      leftTail.right = node;
    }
    node.left = leftTail;
    if (rightHead) {
      rightHead.left = node;
    }
    node.right = rightHead;

    return [leftHead ?? leftTail ?? node, rightTail ?? rightHead ?? node];
  }

  const [head, tail] = __transform(root);
  if (head) {
    head.left = tail;
  }
  if (tail) {
    tail.right = head;
  }

  return head;
}

function flatten(root: TreeNode | null): void {
  let pre: TreeNode | null = null;

  function __traverse(node: TreeNode | null) {
    if (!node) return;
    if (pre) {
      pre.left = null;
      pre.right = node;
    }
    pre = node;
    const [left, right] = [node.left, node.right];
    __traverse(left ?? null);
    __traverse(right ?? null);
  }

  __traverse(root);
}

const one = new TreeNode(1);
const two = new TreeNode(2);
const three = new TreeNode(3);
const four = new TreeNode(4);
const five = new TreeNode(5);
const six = new TreeNode(6);

one.left = two;
one.right = five;
two.left = three;
two.right = four;
five.right = six;
flatten(one);

console.log(one);
