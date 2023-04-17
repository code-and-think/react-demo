import { sum } from 'lodash';

// 状压dp
function squareFreeSubsets(nums: number[]): number {
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
  const maxNum = Math.max(...nums) + 1;
  const masks = Array(maxNum).fill(0);
  for (let i = 2; i < maxNum; i++) {
    for (let j = 0; j < primes.length; j++) {
      if (primes[j] > i) {
        break;
      } else if (i % primes[j] === 0) {
        if (i % primes[j] ** 2 === 0) masks[i] = -1;
        else masks[i] |= 1 << j;
      }
    }
  }

  const M = 1 << primes.length;
  const mod = 1e9 + 7;
  const dp = Array(M).fill(0);
  // 空集
  dp[0] = 1;

  for (let i = 0; i < nums.length; i++) {
    // 对于 1 来说，它的 mask 为 0，相当于 mask 意义上的空集，那么 j | 0 === j 且 j ^ 0 === j，这时所有的 dp[i] 都加上自己变成两倍
    const mask = masks[nums[i]];
    if (mask !== -1) {
      for (let j = M - 1; j >= mask; j--) {
        // 我到哪里去？？？
        // 如果当前集合完全包含 mask，说明可以由 （mask 对应的数） * （其他集合）得到，那么当前集合的方案数就会加上其他集合的方案数
        // 而从后往前推是因为 j ^ mask 总是小于 j，如果从前往后推的话，会重复加上本轮前面的计算结果
        if ((j | mask) === j) {
          dp[j] = (dp[j] + dp[j ^ mask]) % mod;
        }
      }
    }
  }
  // 减去空集
  return (sum(dp) - 1) % mod;
}

console.log(squareFreeSubsets([1, 1, 1, 1]));

function squareFreeSubsets2(nums: number[]): number {
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
  const maxNum = Math.max(...nums) + 1;
  const masks = Array(maxNum).fill(0);
  for (let i = 2; i < maxNum; i++) {
    for (let j = 0; j < primes.length; j++) {
      if (primes[j] > i) {
        break;
      } else if (i % primes[j] === 0) {
        if (i % primes[j] ** 2 === 0) masks[i] = -1;
        else masks[i] |= 1 << j;
      }
    }
  }

  const M = 1 << primes.length;
  const mod = 1e9 + 7;
  const dp = Array(M).fill(0);
  // 空集
  dp[0] = 1;
  const countMap = new Map<number, number>();
  for (const item of nums) {
    countMap.set(item, (countMap.get(item) ?? 0) + 1);
  }

  for (let i = 2; i < masks.length; i++) {
    const mask = masks[i];
    // 是一个无平方因子数
    if (mask > -1) {
      const other = mask ^ (M - 1);
      for (let j = M - 1; j >= 0; j--) {
        if ((other | j) === other) {
          dp[j | mask] = (dp[j | mask] + dp[j] * (countMap.get(i) ?? 0)) % mod;
        }
      }
    }
  }

  // 减去空集
  return ((((sum(dp) % mod) * 2 ** (countMap.get(1) ?? 0)) % mod) - 1 + mod) % mod;
}

console.log(squareFreeSubsets2([2, 3, 5]));
