import * as _ from 'lodash';

// 判断是否能跳到最后一个位置
// 解题思路：最初的 target 是 nums.length - 1，i + nums[i] >= target 的话 target 就会变成当前位置
// 最终判断 target 是否为 0 即可。
function canJump(nums: number[]): boolean {
  let target = nums.length - 1;
  for (let i = nums.length - 2; i >= 0; i--) {
    const end = i + nums[i];
    if (target <= end) {
      target = i;
    }
  }

  return target === 0;
}

// 获取跳到最后一个位置所需的最小步数
// 解题思路：扫过当前位置所能去到的所有位置，然后取最小跳跃次数
function jump(nums: number[]): number {
  if (nums.length === 1) {
    return 0;
  }

  const arr: number[] = [];
  arr[nums.length - 1] = 0;
  for (let i = nums.length - 2; i >= 0; i--) {
    arr[i] = Number.MAX_SAFE_INTEGER;
    for (let j = i + 1; j < Math.min(nums.length, i + nums[i] + 1); j++) {
      arr[i] = Math.min(arr[i], arr[j] + 1);
    }
  }
  return arr[0];
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

// 起点在任意位置，只能跳到 i + arr[i] 处和 i - arr[i] 处
// 问：是否能跳到对应元素值为 0 的任意下标处
// BFS
function canReach(arr: number[], start: number): boolean {
  const n = arr.length;
  const dequeue = new Dequeue<number>();
  const vis = Array(n).fill(false);
  dequeue.enqueue(start);
  vis[start] = true;
  // [0,3,0,6,3,3,4] 6
  while (dequeue.size()) {
    const size = dequeue.size();
    for (let i = 0; i < size; i++) {
      const item = dequeue.dequeue()!;
      if (arr[item] === 0) {
        return true;
      }
      if (item + arr[item] < n && !vis[item + arr[item]]) {
        dequeue.enqueue(item + arr[item]);
        vis[item + arr[item]] = true;
      }
      if (item - arr[item] >= 0 && !vis[item - arr[item]]) {
        dequeue.enqueue(item - arr[item]);
        vis[item - arr[item]] = true;
      }
    }
  }

  return false;
}
