import * as _ from 'lodash';

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
    return this._size === 0;
  }

  enqueue = this.addFirst;
  dequeue = this.removeLast;

  push = this.addFirst;
  pop = this.removeFirst;
}

// 先算乘除，再算加减
function calculate(s: string) {
  const numStack = new Dequeue<number>();
  const operatorStack = new Dequeue<string>();

  let pre = 0;
  const trimStr = s.replace(/\s/g, '');
  for (let i = 0; i < trimStr.length; i++) {
    const char = trimStr[i];
    if (['+', '-', '*', '/'].includes(char)) {
      operatorStack.addLast(char);
    } else {
      pre = pre * 10 + parseInt(char);
      if (!_.isFinite(parseInt(trimStr[i + 1]))) {
        numStack.addLast(pre);
        pre = 0;
        // 先算乘除
        if (['*', '/'].includes(operatorStack.getLast()!)) {
          const right = numStack.removeLast()!;
          const left = numStack.removeLast()!;
          numStack.addLast(
            operatorStack.removeLast() === '*' ? left * right : _.toInteger(left / right)
          );
        }
      }
    }
  }

  while (operatorStack.size()) {
    const operator = operatorStack.removeFirst()!;
    const [left, right] = [numStack.removeFirst()!, numStack.removeFirst()!];

    switch (operator) {
      case '+':
        numStack.addFirst(left + right);
        break;
      case '-':
        numStack.addFirst(left - right);
        break;
      case '*':
        numStack.addFirst(left * right);
        break;
      case '/':
        numStack.addFirst(_.toInteger(left / right));
        break;
    }
  }

  return numStack.removeLast();
}

console.log(calculate('1 - 1 + 1'));
