export function generateParenthesis(n: number): string[] {
  const ans: string[] = [];
  function __traverse(left: number, right: number, str: string) {
    if (left === right && left === n) {
      ans.push(str);
      return;
    }
    if (left < n) {
      str += '(';
      __traverse(left + 1, right, str);
      str = str.slice(0, -1);
    }
    if (right < left) {
      str += ')';
      __traverse(left, right + 1, str);
      str = str.slice(0, -1);
    }
  }
  __traverse(0, 0, '');

  return ans;
}

console.log(generateParenthesis(1));