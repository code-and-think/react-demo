import * as _ from 'lodash';

export {};
class MinStack {
  stack: Array<{ val: number; min: number }>;

  constructor() {
    this.stack = [];
  }

  push(val: number): void {
    const minVal = _.last(this.stack)?.min ?? Number.MAX_SAFE_INTEGER;
    this.stack.push({ val, min: Math.min(val, minVal) });
  }

  // 关键是 pop 出一个最小值后，怎么获取到下一个最小值？？？
  pop(): void {
    this.stack.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1].val;
  }
  // 在常数时间内检索到最小元素
  getMin(): number {
    return this.stack[this.stack.length - 1].min;
  }
}

var obj = new MinStack();
obj.push(3);
obj.push(1);
obj.push(4);
obj.push(2);

console.log(obj.top(), obj.getMin());
obj.pop()
console.log(obj.top(), obj.getMin());
obj.pop()
console.log(obj.top(), obj.getMin());
obj.pop()
console.log(obj.top(), obj.getMin());

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
