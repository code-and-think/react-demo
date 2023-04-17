import { MinPriorityQueue } from '@datastructures-js/priority-queue';

export function topKFrequent(words: string[], k: number) {
  const wordCountMap: Record<string, number> = {};

  for (const word of words) {
    wordCountMap[word] = (wordCountMap[word] ?? 0) + 1;
  }
  // @ts-ignore 不加 ignore 的话 leetcode 会报错：不能添加类型参数
  const pq = new MinPriorityQueue<string>({
    compare(a, b) {
      return wordCountMap[a] === wordCountMap[b]
        ? // 字典序小的在前面
          a.localeCompare(b)
        : // 次数多的在前面
          wordCountMap[b] - wordCountMap[a];
    },
  });

  for (const word of Object.keys(wordCountMap)) {
    pq.enqueue(word);
  }

  return pq.toArray().slice(0,k );
}

console.log(topKFrequent(["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"],4));
