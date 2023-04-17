export {};

function multiply(num1: string, num2: string) {
  if (num1 === '0' || num2 === '0') return '0';
  const [len1, len2] = [num1.length, num2.length];
  const needAddition: string[] = [];

  for (let i = len1 - 1; i >= 0; i--) {
    const cur1 = Number(num1[i]);
    let ans = '0'.repeat(len1 - 1 - i);
    let pre = 0;
    for (let j = len2 - 1; j >= 0; j--) {
      const num = pre + cur1 * Number(num2[j]);
      pre = Math.floor(num / 10);
      ans = (num % 10) + ans;
    }
    needAddition.push(pre === 0 ? ans : pre + ans);
  }

  let [ans, pre, maxLen] = ['', 0, needAddition.reduce((res, str) => Math.max(res, str.length), 0)];
  const padNums = needAddition.map(item => '0'.repeat(maxLen - item.length) + item);

  for (let i = 0; i < maxLen; i++) {
    for (const addStr of padNums) {
      pre += Number(addStr[maxLen - i - 1] ?? '0');
    }
    ans = (pre % 10) + ans;
    pre = Math.floor(pre / 10);
  }

  return pre > 0 ? pre + ans : ans;
}

console.log(multiply('123', '456'));
