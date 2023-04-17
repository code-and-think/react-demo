class DoubleListNode {
  prev?: DoubleListNode;
  next?: DoubleListNode;
  val?: number;
  key?: number;

  constructor(key?: number, val?: number) {
    this.val = val;
    this.key = key;
  }
}

// 最近最久未使用
export class LRUCache {
  capacity: number;
  map: Map<number, DoubleListNode>;
  head: DoubleListNode;
  tail: DoubleListNode;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.map = new Map();
    const head = new DoubleListNode();
    const tail = new DoubleListNode();
    head.next = tail;
    tail.prev = head;

    this.head = head;
    this.tail = tail;
  }

  get(key: number): number {
    const node = this.map.get(key);
    if (node && node.val != null) {
      this.checkNode(node);
      return node.val;
    } else {
      return -1;
    }
  }

  checkNode(node: DoubleListNode) {
    this.removeNode(node);
    this.insertFirst(node);
  }

  removeNode(node: DoubleListNode | undefined) {
    if (node && node.prev && node.next) {
      // 从原位置中删除
      node.prev.next = node.next;
      node.next.prev = node.prev;
      if (node.key) {
        this.map.delete(node.key);
      }
      this.capacity++;
    }
  }

  insertFirst(node: DoubleListNode | undefined) {
    if (node) {
      // 插入头部
      node.next = this.head.next;
      this.head.next!.prev = node;
      node.prev = this.head;
      this.head.next = node;
      if (node.key) {
        this.map.set(node.key, node);
      }
      this.capacity--;
    }
  }

  put(key: number, value: number): void {
    const node = this.map.get(key);
    if (node) {
      node.val = value;
      this.checkNode(node);
    } else {
      // 去除最后一个节点
      if (this.capacity === 0) {
        this.removeNode(this.tail.prev);
      }
      const newNode = new DoubleListNode(key, value);
      this.insertFirst(newNode);
    }
  }
}

const lru = new LRUCache(2);
lru.put(2, 1); // 缓存是 {1=1}
lru.put(2, 2); // 缓存是 {1=1, 2=2}
console.log(lru.get(2)); // 返回 1
lru.put(1, 1); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lru.put(4, 1); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
console.log(lru.get(2)); // 返回 -1 (未找到)

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
