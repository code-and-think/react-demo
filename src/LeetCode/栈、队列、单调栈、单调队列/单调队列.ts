export {};
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
  // 添加到队首
  addFirst(value: T) {
    this.addValue(value, this._head, this._head.next!);
  }
  removeFirst() {
    return this.removeNode(this._head.next);
  }

  removeNode(node: DequeueNode<T> | undefined) {
    if (!node) return;

    const [prev, next] = [node.prev, node.next];

    prev!.next = next;
    next!.prev = prev;

    this._size--;

    return node.val;
  }
  // 获取队首
  getFirst() {
    if (!this._size) {
      return;
    }
    return this._head.next?.val;
  }
  // 添加到队尾
  addLast(value: T) {
    this.addValue(value, this._tail.prev!, this._tail);
  }
  removeLast() {
    return this.removeNode(this._tail.prev);
  }
  addValue(value: T, leftNode: DequeueNode<T>, rightNode: DequeueNode<T>) {
    const node = new DequeueNode(value);
    node.prev = leftNode;
    leftNode.next = node;

    node.next = rightNode;
    rightNode.prev = node;

    this._size++;
  }
  getLast() {
    if (!this._size) return;
    return this._tail.prev?.val;
  }

  size() {
    return this._size;
  }

  empty() {
    return this.size() === 0;
  }

  enqueue = this.addFirst;
  dequeue = this.removeLast;

  push = this.addFirst;
  pop = this.removeFirst;
}

/**
 * 单调队列是一种主要用于解决滑动窗口类问题的数据结构，即，在长度为 n 的序列中，求每个长度为 m 的区间的区间最值。它的时间复杂度是 O(n)
 * 单调队列的基本思想是，维护一个双向队列（deque），遍历序列，仅当一个元素可能成为某个区间最值时才保留它。
 */

// 比如要求 [1,3,6,2,5,1,7] 中固定长度为 4 的滚动窗口中，求每个滚动窗口的最大值
function Test() {
  const [nums, m] = [[1, 3, 6, 2, 5, 1, 7], 4];
  const dequeue = new Dequeue();
  for (let i = 0; i < nums.length; i++) {
    if (!dequeue.empty() && i - dequeue.getFirst() + 1 > m) {
      // 保持窗口最多容纳 m 个元素
      dequeue.removeFirst();
    }
    // 假如左边为 first 后边为 last，保持从左到右递减
    while (!dequeue.empty() && nums[dequeue.getLast()] < nums[i]) {
      // 比新进来的还小，那么它永远不可能成为最大的所以直接出列
      dequeue.removeLast();
    }
    dequeue.addLast(i);
    // 最大值
    console.log(nums[dequeue.getFirst()]);
  }
}
Test();
