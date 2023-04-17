import { uniq } from 'lodash';

export {};

function squareFreeSubsets(nums: number[]) {
  // 质数筛
  const maxVal = Math.max(...nums);
  const isPrime = Array(maxVal + 1).fill(true);
  const primes = [];
  const next = Array(maxVal + 1).fill(1);
  for (let i = 2; i <= maxVal; i++) {
    if (isPrime[i]) {
      primes.push(i);
    }
    for (let j = 0; j < primes.length && i * primes[j] <= maxVal; j++) {
      isPrime[i * primes[j]] = true;
      next[i * primes[j]] = i;
      if (i % primes[j] === 0) {
        break;
      }
    }
  }
  const numPrimes: number[][] = Array.from({ length: maxVal + 1 }, () => []);
  for (let i = 2; i <= maxVal; i++) {
    for (let j = i; j !== 1; j = next[j]) {
      numPrimes[i].push(j / next[j]);
    }
  }
  const leftSame: number[][] = Array.from({ length: maxVal + 1 }, () => []);
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    const curPrimes = numPrimes[i];
    if (uniq(curPrimes).length !== curPrimes.length) {
      leftSame[i].push(i);
    } else {
      for (let j = i + 1; j < n; j++) {
        for (const prime of numPrimes[j]) {
          if (curPrimes.includes(prime)) {
            leftSame[j].push(i);
            break;
          }
        }
      }
    }
  }
}

console.log(squareFreeSubsets([11, 6, 2, 3]));
