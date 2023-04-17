import * as _ from 'lodash';

// candidates中不出现重复数字，但一个数字可以选多次
export function combinationSum(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);
  const [cur, ans, n] = [[] as number[], [] as number[][], candidates.length];

  function __combinationSum(start: number, target: number): void {
    if (target === 0) {
      ans.push([...cur]);
      return;
    } else if (target < candidates[start]) {
      return;
    }

    for (let i = start; i < n; i++) {
      cur.push(candidates[i]);
      __combinationSum(i, target - candidates[i]);
      cur.pop();
    }
  }

  __combinationSum(0, target);

  return ans;
}

// 不能重复选取同个下标的数字，但是不同下标的相同数字可以选，最终结果不能出现重复的组合
function combinationSum2(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);
  const [cur, ans, n] = [[] as number[], [] as number[][], candidates.length];

  function __combinationSum(start: number, target: number) {
    if (target === 0) {
      ans.push([...cur]);
      return;
    } else if (start >= n || target < candidates[start]) {
      return;
    }

    for (let i = start; i < n; i++) {
      cur.push(candidates[i]);
      __combinationSum(i + 1, target - candidates[i]);
      cur.pop();
      while (candidates[i + 1] === candidates[i] && i < n) {
        i++;
      }
    }
  }

  __combinationSum(0, target);

  return ans;
}

// 使用 k 个 1-9 的数字相加和为 n，每个数字只能出现一次
function combinationSum3(k: number, n: number): number[][] {
  const [cur, ans] = [[] as number[], [] as number[][]];

  function __combine(start: number, pickNum: number, target: number) {
    if (pickNum === 0 && target === 0) {
      ans.push([...cur]);
      return;
    } else if (pickNum < 0 || target < 0) {
      return;
    }

    for (let i = start; i <= 9; i++) {
      cur.push(i);
      __combine(i + 1, pickNum - 1, target - i);
      cur.pop();
    }
  }

  __combine(1, k, n);

  return ans;
}

function combinationSum4(nums: number[], target: number): number {
  const memo = Array(target + 1).fill(-1);

  memo[0] = 1;

  function __combine(target: number) {
    if (target < 0) {
      return 0;
    } else if (memo[target] !== -1) {
      return memo[target];
    }
    let cur = 0;

    for (let i = 0; i < nums.length; i++) {
      cur += __combine(target - nums[i]);
    }
    memo[target] = cur;
    return memo[target];
  }

  return __combine(target);
}
console.log(combinationSum4([1, 2, 3], 35));
