// 不含重复数字，所以不可能出现重复的组
function permute1(nums: number[]): number[][] {
  const [cur, ans] = [[] as number[], [] as number[][]];
  function __permute(leave: number[]) {
    if (!leave.length) {
      ans.push([...cur]);
      return;
    }
    for (let i = 0; i < leave.length; i++) {
      cur.push(leave[i]);
      __permute(leave.filter((_, index) => index !== i));
      cur.pop();
    }
  }
  __permute(nums);
  return ans;
}
// 存在重复数字，所以会出现重复的组
export function permute2(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);

  const [cur, ans] = [[] as number[], [] as number[][]];

  function __permute(leave: number[]) {
    if (!leave.length) {
      ans.push([...cur]);
      return;
    }
    for (let i = 0; i < leave.length; i++) {
      cur.push(leave[i]);
      __permute(leave.filter((_, index) => index !== i));
      cur.pop();
      while (leave[i + 1] === leave[i] && i < leave.length) {
        i++;
      }
    }
  }
  __permute(nums);

  return ans;
}

console.log(permute2([1,1,2]));
