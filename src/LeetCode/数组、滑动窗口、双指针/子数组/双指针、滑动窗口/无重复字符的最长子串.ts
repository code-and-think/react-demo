export function lengthOfLongestSubstring(s: string): number {
  const map: Record<string, number> = {};
  let left = 0;
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    const curLetter = s[i];
    // 已经包含
    if (map[curLetter]) {
      for (let j = left; j < i; j++) {
        map[s[j]]--;
        left++;
        if (s[j] === curLetter) {
          break;
        }
      }
    }
    map[curLetter] = (map[curLetter] ?? 0) + 1;
    res = Math.max(res, i - left + 1);
  }

  return res;
}
