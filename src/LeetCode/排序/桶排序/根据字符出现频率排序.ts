export function frequencySort(s: string): string {
  const letterCountMap: Record<string, number> = {};
  for (let i = 0; i < s.length; i++) {
    letterCountMap[s[i]] = (letterCountMap[s[i]] ?? 0) + 1;
  }

  const countLettersMap: string[][] = [];
  // 分桶：相同出现次数的在同一个桶内
  Object.entries(letterCountMap).map(([letter, count]) => {
    countLettersMap[count] = (countLettersMap[count] ?? []).concat(letter);
  });
  // 由高到低查看出现次数
  return countLettersMap.reduceRight((res, item, count) => {
    return item.reduce((res, letter) => res + letter.repeat(count), res);
  }, '');
}

console.log(frequencySort('aAbb'));
