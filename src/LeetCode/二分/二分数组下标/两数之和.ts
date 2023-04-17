import * as _ from 'lodash';

function twoSum(numbers: number[], target: number): number[] {
  function binarySearch(target: number, left: number) {
    let right = numbers.length - 1;
    while (left < right) {
      const mid = _.toInteger((left + right) / 2);
      if (numbers[mid] >= target) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    return numbers[left] === target ? left : -1;
  }

  let ans: number[] = [];
  for (let i = 0; i < numbers.length; i++) {
    const right = binarySearch(target - numbers[i], i + 1);
    if (right !== -1) {
      ans = [i + 1, right + 1];
      break;
    }
  }

  return ans;
}

console.log(twoSum([-1, -1, 2, 2], -2));
