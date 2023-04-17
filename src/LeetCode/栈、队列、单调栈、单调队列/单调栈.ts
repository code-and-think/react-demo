/**
 * 单调栈是一种和单调队列类似的数据结构。单调队列主要用于 解决滑动窗口问题，
 * 单调栈则主要用于 解决NGE问题（Next Greater Element），也就是，对序列中每个元素，找到下一个比它大的元素。（当然，“下一个”可以换成“上一个”，“比它大”也可以换成“比他小”，原理不变。）
 */
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
    return this._tail.prev;
  }

  size() {
    return this._size;
  }

  forEach(cb: (item: T) => void) {
    let cur = this._head.next;
    while (cur && cur !== this._tail) {
      cb(cur.val as T);
      cur = cur?.next;
    }
  }

  enqueue = this.addFirst;
  dequeue = this.removeLast;

  push = this.addFirst;
  pop = this.removeFirst;
}

function dailyTemperatures(temperatures: number[]): number[] {
  const stack = new Dequeue();
  const ans = [];

  for (let i = 0; i < temperatures.length; i++) {
    const cur = temperatures[i];
    while (stack.size) {
      if (temperatures[stack.getFirst()] < cur) {
        const pre = stack.pop();
        ans[pre] = i - pre;
      } else {
        break;
      }
    }
    stack.push(i);
  }

  stack.forEach(i => {
    ans[i] = 0;
  });

  return ans;
}

console.log(dailyTemperatures([1]));
