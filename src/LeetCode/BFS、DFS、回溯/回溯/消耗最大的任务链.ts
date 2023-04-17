export {};
interface Task {
  // 任务id
  id: string;
  // 任务执行耗时
  cost: number;
  // 前置任务id，可选
  dep?: string;
}

// 实例任务列表
const tasks: Task[] = [
  { id: '1', cost: 350, dep: '4' },
  { id: '2', cost: 200, dep: '4' },
  { id: '4', cost: 100, dep: '3' },
  { id: '3', cost: 100 },
];

// 输出
// 300
// 3 4 2

const taskMap = {} as Record<string, Task>;
const taskPathMap = {} as Record<string, { costSum: number; path: string[] }>;
let ans = { costSum: 0, path: [] } as any;

for (const task of tasks) {
  taskMap[task.id] = task;
}

function dfs(id = ''):
  | {
      costSum: number;
      path: string[];
    }
  | undefined {
  if (id) {
    const res = taskPathMap[id];
    if (res) {
      return res;
    } else {
      const task = taskMap[id];
      const { costSum = 0, path = [] } = dfs(task.dep) ?? {};
      const curPath = {
        costSum: costSum + task.cost,
        path: path.concat(task.id),
      };
      taskPathMap[id] = curPath;
      if (curPath.costSum > ans.costSum) {
        ans = curPath;
      }
      return curPath;
    }
  }
}

for (let i = 0; i < tasks.length; i++) {
  dfs(tasks[i].id);
}

console.log(ans);
