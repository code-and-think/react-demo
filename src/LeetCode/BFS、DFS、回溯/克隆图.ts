export {};

class Node {
  val: number;
  neighbors: Node[];
  constructor(val?: number, neighbors?: Node[]) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
  }
}

class DequeueNode<T> {
  prev: DequeueNode<T> | undefined;
  next: DequeueNode<T> | undefined;
  val: T;

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

  addFirst(value: T) {
    this.addValue(value, this._head, this._head.next!);
  }
  removeFirst() {
    if (!this.size()) return;
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
    if (!this.size()) return;
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
}

function cloneGraph(node: Node | null): Node | null {
  if (!node) return node;
  // return useBFS(node);
  return useDFS(node);
}

function useDFS(node: Node): Node | null {
  const map = new Map<Node, Node>();
  dfs(node);

  function dfs(node: Node) {
    const cloneNode = map.get(node) ?? new Node(node.val);
    map.set(node, cloneNode);
    for (const nextNode of node.neighbors ?? []) {
      cloneNode.neighbors.push(map.get(nextNode) ?? dfs(nextNode));
    }
    return cloneNode;
  }

  return map.get(node) ?? null;
}

function useBFS(node: Node | null): Node | null {
  const map = new Map<Node | null | undefined, Node>();
  const queue = new Dequeue([node]);

  while (queue.size()) {
    const originNode = queue.removeLast();
    const cloneNode = map.get(originNode) ?? new Node(originNode?.val);
    map.set(originNode, cloneNode);
    for (const nextNode of originNode?.neighbors ?? []) {
      let nextNodeCloneNode = map.get(nextNode);
      // 第一次遍历到该节点
      if (!nextNodeCloneNode) {
        nextNodeCloneNode = new Node(nextNode?.val);
        map.set(nextNode, nextNodeCloneNode);
        queue.addFirst(nextNode);
      }
      cloneNode.neighbors.push(nextNodeCloneNode);
    }
  }

  return map.get(node) ?? null;
}
