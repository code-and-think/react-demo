import * as _ from 'lodash';

function canMeasureWater(
  jug1Capacity: number,
  jug2Capacity: number,
  targetCapacity: number
): boolean {
  const map = new Map<number, Set<number>>();
  const [min, max] = [Math.min(jug1Capacity, jug2Capacity), Math.max(jug1Capacity, jug2Capacity)];

  function __traverse(left: number, right: number) {
    if (left < 0 || left > min || right < 0 || right > max) {
      return false;
    } else if (left + right === targetCapacity) {
      return true;
    }

    const set = map.get(left) ?? new Set();
    if (!set.has(right)) {
      set.add(right);
      map.set(left, set);
      // 装满 left
      if (
        // 水从外面来
        __traverse(min, right) ||
        // 水从右边来
        __traverse(min, left + right - min)
      ) {
        return true;
      }
      // 清空 left
      else if (
        // 水到外界去
        __traverse(0, right) ||
        // 水到右边去
        __traverse(0, left + right)
      ) {
        return true;
      }
      // 装满 right
      else if (__traverse(left, max) || __traverse(left + right - max, max)) {
        return true;
      } else if (__traverse(left, 0) || __traverse(left + right, 0)) {
        return true;
      }
    }

    return false;
  }

  return __traverse(0, 0);
}
