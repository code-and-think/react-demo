class PriorityQueue<T = any> {
  comparator: (a: T, b: T) => number;
  items: T[];

  // 小根堆
  constructor(
    comparator: (...args: [T, T]) => number = (a: T, b: T) => (a === b ? 0 : a > b ? 1 : -1)
  ) {
    this.comparator = comparator;
    this.items = [];
  }

  empty() {
    return this.items.length === 0;
  }

  swap(x: number, y: number) {
    [this.items[x], this.items[y]] = [this.items[y], this.items[x]];
  }

  compare(x: number, y: number) {
    return this.comparator(this.items[x], this.items[y]);
  }

  enqueue(item: T) {
    const items = this.items;
    items.push(item);
    let cur = items.length - 1;
    while (cur > 0) {
      let parent = Math.floor((cur - 1) / 2);
      if (this.compare(cur, parent) < 0) {
        this.swap(cur, parent);
        cur = parent;
      } else {
        break;
      }
    }
  }

  size() {
    return this.items.length;
  }

  dequeue() {
    if (!this.size()) {
      return;
    }
    const items = this.items;
    this.swap(0, items.length - 1);
    const res = items.pop();
    // 将 0 sink 下去
    let parent = 0;
    const boundary = Math.floor(items.length / 2) - 1;
    while (parent <= boundary) {
      const [leftChild, rightChild] = [parent * 2 + 1, parent * 2 + 2];
      const minChild =
        rightChild < items.length && this.compare(rightChild, leftChild) < 0
          ? rightChild
          : leftChild;
      if (this.compare(minChild, parent) < 0) {
        this.swap(minChild, parent);
        parent = minChild;
      } else {
        break;
      }
    }

    return res;
  }

  front() {
    return this.items[0];
  }
}

export function topKFrequent(words: string[], k: number) {
  const wordCountMap: Record<string, number> = {};

  for (const word of words) {
    wordCountMap[word] = (wordCountMap[word] ?? 0) + 1;
  }

  const pq = new PriorityQueue<string>((a, b) =>
    wordCountMap[a] === wordCountMap[b] ? a.localeCompare(b) : wordCountMap[b] - wordCountMap[a]
  );

  for (const word of Object.keys(wordCountMap)) {
    pq.enqueue(word);
  }

  const res = [];
  for (let i = 0; i < k; i++) {
    res.push(pq.dequeue());
  }

  return res;
}
