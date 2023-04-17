export function heapSort(nums: number[]) {
  function swap(x: number, y: number) {
    [nums[x], nums[y]] = [nums[y], nums[x]];
  }
  // count 表示当前堆所剩的节点数量
  // bound 就是最后一个非叶子节点的下标，如果 parentIndex 大于该下标的话说明已经调整完成不需要再下沉了
  function sink(parent: number, count: number) {
    // 对应构建堆时的 （nums.length / 2）- 1
    const bound = Math.floor(count / 2) - 1;
    while (parent <= bound) {
      const leftChild = 2 * parent + 1;
      const rightChild = 2 * parent + 2;
      const maxChild =
        rightChild < count && nums[rightChild] > nums[leftChild] ? rightChild : leftChild;
      if (nums[maxChild] > nums[parent]) {
        swap(maxChild, parent);
        parent = maxChild;
      } else {
        break;
      }
    }
  }

  // 建堆：从最后一个非叶子节点开始：为什么是 len / 2 -1 ???
  // 当最后一个非叶子节点有两个子节点时，最后一个叶子节点为 len - 1，则其父节点为 （len - 1 - 2） / 2 = len / 2 - 1
  // 当最后一个非叶子节点有一个子节点时，最后一个叶子节点为 len - 1,则其父节点为（len - 1 - 1) / 2 = len / 2 - 1
  for (let i = Math.floor(nums.length / 2) - 1; i >= 0; i--) {
    sink(i, nums.length);
  }

  // 遍历堆
  let count = nums.length;
  while (count) {
    count--;
    // 把最小的放到最后
    swap(0, count);
    // 把新的沉下去，恢复小恨堆
    sink(0, count);
  }

  return nums;
}
