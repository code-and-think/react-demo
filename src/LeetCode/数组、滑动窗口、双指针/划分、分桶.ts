import * as _ from 'lodash';

// 划分数组为连续数字的集合：判断是否能将数组划分为 k 个由连续数字组成的集合
function isPossibleDivide(nums: number[], k: number): boolean {
  const n = nums.length;
  if (n % k !== 0) {
    return false;
  }
  const buckets: number[][] = Array.from({ length: n / k }, () => []);

  nums.sort((a, b) => a - b);

  let nextIndex = 0;
  for (let i = 0; i < nums.length; i++) {
    const cur = nums[i];
    if (cur === nums[i - 1]) {
      nextIndex++;
    } else {
      nextIndex = 0;
    }
    const bucket = buckets[nextIndex];
    // !bucket 表示相同元素过多导致最终需要的桶比预期的多，返回 false
    // cur - bucket[bucket.length - 1] !== 1 表示桶内的元素不连续，返回 false
    if (!bucket || cur - (bucket[bucket.length - 1] ?? cur - 1) !== 1) {
      return false;
    }
    bucket.push(cur);
    if (buckets[0].length === k) {
      buckets.shift();
      nextIndex--;
    }
  }

  return buckets.length === 0;
}
