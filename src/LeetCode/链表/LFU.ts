export class DoubleListNode {
  key: number | undefined;
  val: number | undefined;
  prev: DoubleListNode | undefined;
  next: DoubleListNode | undefined;
  count: number;

  constructor(key?: number, val?: number) {
    this.key = key;
    this.val = val;
    this.count = 1;
  }
}

// 最不经常使用
// 如果出现平局的情况，则去除最近最久未使用
type NodeList = { head: DoubleListNode; tail: DoubleListNode };
class LFUCache {
  // key:次数 value:双向链表
  // 每次操作都从当前次数的双向链表中删除
  // 然后插入下一次的双向链表的头部
  countNodeListMap: Map<number, NodeList>;
  keyNodeMap: Map<number, DoubleListNode>;
  minCount: number;
  capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.minCount = Number.MAX_SAFE_INTEGER;
    this.capacity = capacity;
    this.countNodeListMap = new Map();
    this.keyNodeMap = new Map();
  }

  get(key: number): number {
    const node = this.keyNodeMap.get(key);
    if (node && node.val != null) {
      this.checkNode(node);
      return node.val;
    } else {
      return -1;
    }
  }

  getNodeList(count: number) {
    let nodeList = this.countNodeListMap.get(count);
    if (!nodeList) {
      const head = new DoubleListNode();
      const tail = new DoubleListNode();
      head.next = tail;
      tail.prev = head;
      nodeList = { head, tail };
      this.countNodeListMap.set(count, nodeList);
    }
    return nodeList;
  }

  checkNode(node: DoubleListNode) {
    this.removeNode(node);
    node.count++;
    this.insertFirst(node);
  }

  removeNode(node: DoubleListNode) {
    const { head, tail } = this.getNodeList(node.count);
    if (node.prev && node.next) {
      this.capacity++;
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
    // 删除节点后，可能插入新的，也可能是去到+1位置
    if (node.count === this.minCount && head.next === tail) {
      this.minCount = Number.MAX_SAFE_INTEGER;
    }
    if (node.key != null) {
      this.keyNodeMap.delete(node.key);
    }
  }

  insertFirst(node: DoubleListNode) {
    const { head } = this.getNodeList(node.count);
    node.next = head.next;
    head.next!.prev = node;
    node.prev = head;
    head.next = node;
    this.capacity--;
    this.minCount = Math.min(this.minCount, node.count);
    if (node.key != null) {
      this.keyNodeMap.set(node.key, node);
    }
  }

  removeMinCountLastNode() {
    const minCountLastNode = this.getNodeList(this.minCount).tail.prev;
    if (minCountLastNode) {
      this.removeNode(minCountLastNode);
    }
  }

  // 修改值，然后计数器++
  // 最少未使用
  put(key: number, value: number): void {
    const node = this.keyNodeMap.get(key);
    // 已存在节点
    if (node) {
      node.val = value;
      this.checkNode(node);
    } else {
      // 不存在节点
      if (this.capacity === 0) {
        this.removeMinCountLastNode();
      }
      if (this.capacity > 0) {
        const listNode = new DoubleListNode(key, value);
        this.insertFirst(listNode);
      }
    }
  }
}

const lfu = new LFUCache(1);
lfu.put(0, 0);
console.log(lfu.get(0));

// console.log(lfu.get(2));
// console.log(lfu.get(3));
// lfu.put(4, 4);
// console.log(lfu.get(1));
// console.log(lfu.get(3));
// console.log(lfu.get(4));

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
