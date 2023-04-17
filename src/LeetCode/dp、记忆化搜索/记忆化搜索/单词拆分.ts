import * as _ from 'lodash';

// 是否可以用 wordDict 中的拼出 s
// 1. 不要求字典中的都使用
// 2. 并且字典中的单词可以重复使用
function wordBreak(s: string, wordDict: string[]): boolean {
  const wordSet = new Set();
  let maxLength = 0;
  for (const word of wordDict) {
    maxLength = Math.max(maxLength, word.length);
    wordSet.add(word);
  }

  const memo: Record<string, boolean> = { '': true };

  function __traverse(word: string) {
    if (memo[word] != null) return memo[word];
    for (let i = 1; i <= Math.min(word.length, maxLength); i++) {
      const left = word.slice(0, i);
      if (wordSet.has(left) && __traverse(word.slice(i))) {
        return (memo[word] = true);
      }
    }

    return (memo[word] = false);
  }

  return __traverse(s);
}

console.log(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']));
