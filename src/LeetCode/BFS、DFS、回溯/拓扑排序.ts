
// 课程表
export function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const dependMap = Array.from({ length: numCourses }, () => [] as number[]);
  const dependCount = Array(numCourses).fill(0);

  for (const [item, depend] of prerequisites) {
    dependMap[depend].push(item);
    dependCount[item]++;
  }

  const queue = new Set<number>();

  dependCount.forEach((count, item) => {
    if (count === 0) {
      queue.add(item);
    }
  });

  for (const item of queue) {
    console.log(item);
    for (const dependCurItem of dependMap[item]) {
      if (--dependCount[dependCurItem] <= 0) {
        queue.add(dependCurItem);
      }
    }
  }

  return queue.size === numCourses;
}

// 课程表2
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const dependMap = Array.from({ length: numCourses }, () => [] as number[]);
  const dependCount = Array(numCourses).fill(0);

  for (const [item, depend] of prerequisites) {
    dependMap[depend].push(item);
    dependCount[item]++;
  }

  const queue = new Set<number>();

  dependCount.forEach((count, item) => {
    if (count === 0) {
      queue.add(item);
    }
  });

  for (const item of queue) {
    for (const dependCurItem of dependMap[item]) {
      if (--dependCount[dependCurItem] <= 0) {
        queue.add(dependCurItem);
      }
    }
  }

  return queue.size === numCourses ? Array.from(queue) : [];
}
