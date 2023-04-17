import * as _ from 'lodash';

const set = new Set([1, 2]);
const iteObj = set.keys();

console.log(iteObj.next().value);
console.log(iteObj.next().value);
// 当前遍历器对象已触发到底的开关导致遍历器关闭，后面再添加也遍历不到了
console.log(iteObj.next().value); // undefined
set.add(3);
console.log(iteObj.next().value); // undefined

// 需要重新调用方法获取新的遍历器
const iteObj1 = set.keys();
console.log(iteObj1.next().value);
console.log(iteObj1.next().value);
console.log(iteObj1.next().value);
set.add(4);
// 未到底，所以新添加的也能遍历到
console.log(iteObj1.next().value); // 4

// 因为 Set 同时也是个队列，且是个去重的队列，所以多数情况下也可以直接当队列来用
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
function levelSearch(root: TreeNode | null) {
  const queue = new Set<TreeNode>();
  if (root == null) {
    return;
  }
  queue.add(root);
  const iteObj = queue.keys();
  let size = queue.size;

  while (size > 0) {
    const arr: number[] = [];
    let nextLevelSize = 0;
    for (let i = 0; i < size; i++) {
      const node: TreeNode = iteObj.next().value;
      arr.push(node.val);
      if (node.left) {
        queue.add(node.left);
        nextLevelSize++;
      }
      if (node.right) {
        queue.add(node.right);
        nextLevelSize++;
      }
    }
    size = nextLevelSize;
    console.log(arr);
  }
}

const root = new TreeNode(1);
const two = new TreeNode(2);
const three = new TreeNode(3);
const four = new TreeNode(4);
const five = new TreeNode(5);
root.left = two;
root.right = three;
two.left = four;
two.right = five;
levelSearch(root);
