export function myPow(x: number, n: number): number {
  let res = 1;
  let a = x;
  let absN = Math.abs(n);

  while (absN) {
    if (absN & 1) {
      res *= a;
    }
    a *= a;
    // 不要使用移位操作，在 -2147483648 的时候会死循环
    absN = Math.floor(absN / 2);
    console.log(absN)
  }

  return n < 0 ? 1 / res : res;
}

console.log(myPow(1, -2147483648));
