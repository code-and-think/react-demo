export {};

// 2^n 中当 n 为整数时整体值为 2 的幂次
// 当 n 为负数时整体值为小数
function isPowerOfTwo(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
}
