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
  { id: '1', cost: 350, dep: '3' },
  { id: '2', cost: 200, dep: '4' },
  { id: '4', cost: 100 },
  { id: '3', cost: 100, dep: '1' },
];

console.log(hasCircleDep(tasks));

function hasCircleDep(tasks: Task[]) {
  const taskMap = {} as Record<string, Task>;

  for (const task of tasks) {
    taskMap[task.id] = task;
  }

  function dfs(id = '') {
    if (vis.has(id)) {
      // 存在循环依赖
      return true;
    } else {
      // 不存在循环依赖
      if (taskMap[id].dep) {
        vis.add(taskMap[id].id);
        if (dfs(taskMap[id].dep)) {
          return true;
        }
        vis.delete(taskMap[id].id);
      }
    }

    return false;
  }

  let vis = new Set<string>();

  for (let i = 0; i < tasks.length; i++) {
    vis = new Set();
    if (dfs(tasks[i].id)) {
      return true;
    }
  }

  return false;
}
