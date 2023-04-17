export {};

function checkInclusion(s1: string, s2: string): boolean {
  const [char1, aCode, len1, len2] = [Array(26).fill(0), 'a'.charCodeAt(0), s1.length, s2.length];

  for (let i = 0; i < len1; i++) {
    char1[s1[i].charCodeAt(0) - aCode]++;
  }

  const sort1 = char1.join('');

  const char2 = Array(len2 + 1).fill(Array(26).fill(0));
  for (let i = 0; i < len2; i++) {
    char2[i + 1] = [...char2[i]];
    char2[i + 1][s2[i].charCodeAt(0) - aCode]++;

    if (i >= len1 - 1) {
      const arr = Array(26).fill(0);
      for (let j = 0; j < 26; j++) {
        arr[j] = char2[i + 1][j] - char2[i + 1 - len1][j];
      }
      if (arr.join('') === sort1) {
        return true;
      }
    }
  }

  return false;
}

console.log(checkInclusion('', 'abcd'));
