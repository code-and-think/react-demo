// 字典树
export class TrieNode {
  next: Record<string, TrieNode>;
  content: string;
  count = 0;

  constructor(content = '') {
    this.next = {};
    this.content = content;
  }

  addNextNode(key: string, isEnd?: boolean) {
    this.next[key] = this.next[key] ?? new TrieNode(this.content + key);
    if (isEnd) {
      this.next[key].count++;
    }
    return this.next[key];
  }
}
// 得到次数 -> 单词，并且单词按照
export function topKFrequent(words: string[], k: number) {
  const root = new TrieNode();
  words.forEach(item => {
    let cur = root;
    for (let i = 0; i < item.length; i++) {
      cur = cur.addNextNode(item[i], i === item.length - 1);
    }
  });
  // "a"  "ab" "ac" "ad"
  const countWordMap: string[][] = [];
  function traverse(curNode: TrieNode) {
    Object.keys(curNode.next)
      .sort((a, b) => (a > b ? 1 : -1))
      .forEach(key => {
        const nextNode = curNode.next[key];
        if (nextNode.count) {
          countWordMap[nextNode.count] = countWordMap[nextNode.count] ?? [];
          countWordMap[nextNode.count].push(nextNode.content);
        }
        // push必须在 traverse 前面，因为相同顺序按字典序排，而字典序中短的在前
        traverse(nextNode);
      });
  }

  traverse(root);

  return countWordMap.reduceRight((res, item) => {
    return res.concat(item.slice(0, k - res.length));
  }, []);
}
require('util').inspect.defaultOptions.depth = null;
// i love coding leetcode
console.log(topKFrequent(['i', 'alove', 'leetcode', 'i', 'alove', 'coding'], 3));
