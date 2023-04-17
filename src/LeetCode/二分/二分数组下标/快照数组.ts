export class SnapshotArray {
  snapCount: number;
  indexSnapValueArrMap: Map<number, Array<{ snap_id: number; value: number }>>;
  indexModifyMap: Map<number, number>;
  arr: Array<number>;

  constructor(length: number) {
    this.arr = Array(length).fill(0);
    this.indexModifyMap = new Map();
    for (let i = 0; i < length; i++) {
      this.indexModifyMap.set(i, 0);
    }
    this.snapCount = 0;
    this.indexSnapValueArrMap = new Map();
  }

  set(index: number, val: number): void {
    if (this.arr[index] !== val) {
      this.arr[index] = val;
      this.indexModifyMap.set(index, val);
    }
  }

  snap(): number {
    const snap_id = this.snapCount++;
    for (const [index, value] of this.indexModifyMap.entries()) {
      const snapValueArr = this.indexSnapValueArrMap.get(index) ?? [];
      snapValueArr.push({ snap_id, value });
      this.indexSnapValueArrMap.set(index, snapValueArr);
    }
    this.indexModifyMap.clear();

    return snap_id;
  }

  // 获取快照 snap_id 下的数组的值
  get(index: number, snap_id: number) {
    const snapValueArr = this.indexSnapValueArrMap.get(index);
    if (snapValueArr) {
      let left = 0,
        right = snapValueArr.length - 1;
      // 小于等于
      while (left < right) {
        const mid = (left + right + 1) >> 1;
        if (snapValueArr[mid].snap_id > snap_id) {
          right = mid - 1;
        } else {
          left = mid;
        }
      }
      return snapValueArr[left].value;
    }
  }
}
