export {};

function minSteps(n: number): number {
  // 最初只有一个字符 'A'，每次可以进行两种操作：复制所有
  // 可以一次复制，多次粘贴
  const memo = Array.from({ length: n }, () => Array(n).fill(-1));

  function __traverse(clipboardNum: number, curNum: number) {
    if (curNum === n) {
      return 0;
    } else if (curNum + clipboardNum > n) {
      return Number.MAX_SAFE_INTEGER;
    } else if (memo[clipboardNum]?.[curNum] !== -1) {
      return memo[clipboardNum][curNum];
    }

    memo[clipboardNum][curNum] =
      Math.min(
        // 粘贴
        clipboardNum > 0
          ? __traverse(clipboardNum, curNum + clipboardNum)
          : Number.MAX_SAFE_INTEGER,
        // 复制
        clipboardNum < curNum ? __traverse(curNum, curNum) : Number.MAX_SAFE_INTEGER
      ) + 1;

    return memo[clipboardNum][curNum];
  }

  return __traverse(0, 1);
}
