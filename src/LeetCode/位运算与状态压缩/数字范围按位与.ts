

function rangeBitwiseAnd(left: number, right: number): number {
  let numCount = right - left + 1;
  let bit = 1;
  let ans = right;
  while (numCount > bit) {
    ans &= ~bit;
    bit *= 2;
  }

  while (bit <= right) {
    // 该位为 1
    if (ans & bit & (right & bit)) {
      ans |= bit;
    } else {
      // 该位为 0
      ans &= ~bit;
    }
    bit *= 2;
  }

  return ans;
}