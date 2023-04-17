/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
import * as _ from 'lodash';
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

class DequeueNode<T> {
  prev: DequeueNode<T> | undefined;
  next: DequeueNode<T> | undefined;
  val: T | undefined;

  constructor(val: T) {
    this.val = val;
  }
}

// 用双向链表实现双端队列
class Dequeue<T = any> {
  private _head: DequeueNode<T>;
  private _tail: DequeueNode<T>;
  private _size: number;

  constructor(items: T[] = []) {
    const head = new DequeueNode(undefined as T);
    const tail = new DequeueNode(undefined as T);

    head.next = tail;
    tail.prev = head;

    this._head = head;
    this._tail = tail;
    this._size = 0;

    for (const item of items) {
      this.addFirst(item);
    }
  }

  private removeNode(node: DequeueNode<T> | undefined) {
    if (!node) return;

    const [prev, next] = [node.prev, node.next];

    prev!.next = next;
    next!.prev = prev;

    this._size--;

    return node.val;
  }

  private addValue(value: T, leftNode: DequeueNode<T>, rightNode: DequeueNode<T>) {
    const node = new DequeueNode(value);
    node.prev = leftNode;
    leftNode.next = node;

    node.next = rightNode;
    rightNode.prev = node;

    this._size++;
  }

  // 添加到队尾
  addLast(value: T) {
    this.addValue(value, this._tail.prev!, this._tail);
  }
  removeLast() {
    return this.removeNode(this._tail.prev);
  }
  getLast() {
    if (!this._size) return;
    return this._tail.prev?.val;
  }
  // 添加到队首
  addFirst(value: T) {
    this.addValue(value, this._head, this._head.next!);
  }
  removeFirst() {
    return this.removeNode(this._head.next);
  }
  // 获取队首
  getFirst() {
    if (!this._size) {
      return;
    }
    return this._head.next?.val;
  }

  size() {
    return this._size;
  }

  isEmpty() {
    return this._size === 0;
  }

  enqueue = this.addFirst;
  dequeue = this.removeLast;

  push = this.addFirst;
  pop = this.removeFirst;
}

// 每一层的最右节点
function rightSideView(root: TreeNode | null): number[] {
  const ans: number[] = [];
  const queue = new Dequeue<TreeNode>();
  if (!root) return ans;
  queue.enqueue(root);

  while (queue.size()) {
    const size = queue.size();
    ans.push(0);

    for (let i = 0; i < size; i++) {
      const node = queue.dequeue()!;
      ans[ans.length - 1] = node?.val;
      if (node?.left) {
        queue.enqueue(node.left);
      }
      if (node?.right) {
        queue.enqueue(node.right);
      }
    }
  }

  return ans;
}
