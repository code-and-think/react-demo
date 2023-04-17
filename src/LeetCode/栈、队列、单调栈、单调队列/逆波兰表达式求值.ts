import { floor, toInteger } from "lodash";

// 后缀表达式相比一般常用的中缀来说，好处是不需要加括号
export {};
function evalRPN(tokens: string[]): number {
  const stack: number[] = [];

  for (const token of tokens) {
    if (['+', '-', '*', '/'].includes(token)) {
      const [right, left] = [stack.pop(), stack.pop()] as number[];
      switch (token) {
        case '+':
          stack.push(left + right);
          break;
        case '-':
          stack.push(left - right);
          break;
        case '*':
          stack.push(left * right);
          break;
        case '/':
          stack.push(toInteger(left / right));
          break;
      }
    } else {
      stack.push(parseInt(token));
    }
  }

  return stack[0];
}

console.log(evalRPN(['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']));

