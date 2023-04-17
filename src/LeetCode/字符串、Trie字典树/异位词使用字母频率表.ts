// 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
// 异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。

export function findAnagrams(s: string, p: string): number[] {
  const [pChar, aCode, sLen, pLen] = [Array(26).fill(0), 'a'.charCodeAt(0), s.length, p.length];

  for (const char of p) {
    pChar[char.charCodeAt(0) - aCode]++;
  }

  const [ans, sortP] = [[] as number[], pChar.join('')];

  const sCharSum = Array.from({ length: sLen + 1 }, () => Array(26).fill(0));
  for (let i = 0; i < sLen; i++) {
    sCharSum[i + 1] = [...sCharSum[i]];
    sCharSum[i + 1][s[i].charCodeAt(0) - aCode]++;
  }

  for (let i = pLen - 1; i < sLen; i++) {
    const arr = Array(26).fill(0);
    for (let j = 0; j < 26; j++) {
      arr[j] += sCharSum[i + 1][j] - sCharSum[i - pLen + 1][j];
    }

    if (arr.join('') === sortP) {
      ans.push(i - pLen + 1);
    }
  }

  return ans;
}
console.log(findAnagrams('abab', 'ab'));
