export {};

function singleNumber1(nums: number[]): number {
  let res = 0;
  // 必须要到 32位去看看符号位是什么
  for (let lowBit = 0; lowBit < 32; lowBit++) {
    let oneNum = 0;
    let lowBitVal = 1 << lowBit;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] & lowBitVal) {
        oneNum++;
      }
    }
    if (oneNum % 3) {
      res |= lowBitVal;
    }
  }

  return res;
}

function singleNumber(nums: number[]): number[] {
  const mask = nums.reduce((res, item) => res ^ item, 0);
  let [left, right] = [0, 0];
  const lowBit = mask & -mask;

  nums.forEach(item => {
    if (item & lowBit) {
      left ^= item;
    } else {
      right ^= item;
    }
  });

  return [left, right];
}
