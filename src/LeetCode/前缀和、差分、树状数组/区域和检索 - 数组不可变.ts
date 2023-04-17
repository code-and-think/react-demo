export class NumArray {
  preSum: number[];
  constructor(nums: number[]) {
    this.preSum = [0];
    nums.forEach(item => [this.preSum.push(this.preSum[this.preSum.length - 1] + item)]);
  }

  sumRange(left: number, right: number): number {
    return this.preSum[right + 1] - this.preSum[left];
  }
}

const arr = new NumArray([1,2,3,4])
console.log(arr.sumRange(0,0));
console.log(arr.sumRange(0,1));
console.log(arr.sumRange(0,2))
console.log(arr.sumRange(0,3))
