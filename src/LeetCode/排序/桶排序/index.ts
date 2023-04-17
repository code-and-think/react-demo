// 分桶（有不同的分桶策略：比如数据在 [0,100] 之间，我们根据 num/10 来分桶）
const BUCKET_NUM = 10;
export function bucketSort(nums: number[]) {
  const buckets: number[][] = Array(BUCKET_NUM);
  // 分桶
  for (const item of nums) {
    const bucketIndex = Math.floor(item / 10);
    buckets[bucketIndex] = buckets[bucketIndex] ?? [];
    buckets[bucketIndex].push(item);
  }
  // 桶内排序
  buckets.forEach(item => item.sort());
  // 桶合并
  return buckets.reduce((res, item) => res.concat(item), []);
}

console.log(bucketSort([31, 21, 11, 1, 0, 2, 11, 21, 31, 41]));
