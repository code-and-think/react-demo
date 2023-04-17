// 求 0 - n 范围内的所有素数
// 核心原理：一个合数一定由质数构成

// 埃氏筛
export function erichsen(n = 1e5) {
  const isPrime = Array(n).fill(true);
  for (let i = 2; i < n / i; i++) {
    if (isPrime[i]) {
      // 为什么不是从 i * 1 开始而是由 i * i 开始呢？？？
      // 比如 i = 2 中就已经遍历了 2 * 3，所以在 i = 3 时不需要便利 3 * 2
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = false;
      }
    }
  }
}
// 但是埃氏筛存在重复筛选的情况，比如：12 => 既可以被 2 * 6 筛到，也可以被 3 * 4 筛选到。
// 欧拉筛，就是只通过数的最小质因数筛数，比如 12 = 3 * 4 和 2 * 6，他的最小质因数是 2，所以要求只能通过 2 * 6 筛到
// 怎么实现呢？？？
// 我们通过 primes 从小到大记录前面筛到的质数，比如避免 i=4 primes[j]=3 的出现，我们在 4 * 2 之后判断 4 % 2 === 0 就退出了
// 因为后面的 i * primes[j] 都可以分解成 2 * i/2 * primes[j] 的情况，也就是说 2 是最小质因数，
export function euler(n = 1e5) {
  const isPrime = Array(n).fill(true);
  const primes = [] as number[];

  for (let i = 2; i < n; i++) {
    if (isPrime[i]) {
      primes.push(i);
    }
    for (let j = 0; j < primes.length && i * primes[j] < n; j++) {
      isPrime[primes[j] * i] = false;
      if (i % primes[j] === 0) {
        break;
      }
    }
  }
}
