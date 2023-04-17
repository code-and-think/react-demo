export {};
import * as _ from 'lodash';

function squareFreeSubsets(nums: number[]): number {
  const maxVal = Math.max(...nums) + 1;
  const isPrime = Array(maxVal).fill(true);
  const primes = [] as number[];
  const next = Array(maxVal).fill(1);

  for (let i = 2; i < maxVal; i++) {
    if (isPrime[i]) {
      primes.push(i);
    }
    for (let j = 0; j < primes.length && i * primes[j] < maxVal; j++) {
      isPrime[i * primes[j]] = false;
      next[i * primes[j]] = i;
      if (i % primes[j] === 0) {
        break;
      }
    }
  }

  const primeIndexMap = new Map<number, Set<number>>();
  let minusNum = 0;
  let ans = 0;
  const mod = 1e9 + 7;
  const len = nums.length;

  for (let i = len - 1; i >= 0; i--) {
    let num = nums[i];
    const numPrimes: number[] = [];
    while (num !== 1) {
      numPrimes.push(num / next[num]);
      num = next[num];
    }
    // 自身出现重复因数
    if (_.uniq(numPrimes).length !== numPrimes.length) {
      minusNum++;
    } else {
      const samePrimeNum = new Set<number>();
      for (const prime of numPrimes) {
        const set = primeIndexMap.get(prime) ?? new Set();
        set.forEach(item => samePrimeNum.add(item));
        set.add(i);
        primeIndexMap.set(prime, set);
      }
      ans = (ans + 2 ** (len - 1 - i - samePrimeNum.size - minusNum)) % mod;
    }
  }

  return ans;
}

squareFreeSubsets([8, 11, 17, 2, 25, 29, 21, 20, 4, 22]);
