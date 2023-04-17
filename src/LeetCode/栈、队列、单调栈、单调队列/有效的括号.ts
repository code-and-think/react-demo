export function isValid(s: string): boolean {
  const stack = [];
  const isLeft = (letter: string) => ['(', '[', '{'].includes(letter);
  for (let i = 0; i < s.length; i++) {
    if (isLeft(s[i])) {
      stack.push(s[i]);
    } else {
      if (stack[stack.length - 1] === { ')': '(', '}': '{', ']': '[' }[s[i]]) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}

console.log(isValid('()'));