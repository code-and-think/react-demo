// 实现一个带并发限制的异步调度器 Scheduler 保证同时运行的任务最多有 n 个

class Scheduler {
  constructor(n = 2) {
    this.limit = n;
    this.executeNum = 0;
    this.tasks = [];
  }
  addTask(promiseCreator) {
    this.tasks.push(promiseCreator);
    this.executeTask();
  }
  executeTask() {
    const { tasks, limit, executeNum } = this;
    if (tasks.length > 0 && executeNum < limit) {
      this.executeNum++;
      tasks
        .shift()()
        .then(() => {
          this.executeNum--;
          this.executeTask();
        });
    }
  }
}

const scheduler = new Scheduler();

const pre = Date.now();
const addTask = (wait, content) => {
  scheduler.addTask(
    () =>
      new Promise(resolve =>
        setTimeout(() => {
          resolve();
          console.log(content, Date.now() - pre);
        }, wait)
      )
  );
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');

/**
 * 起始 1,2 任务开始执行
 * 500ms时，2任务执行完毕，输出2，任务3开始执行
 * 800ms时，3任务执行完毕，输出3，任务4开始执行
 * 1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
 * 1200ms时，4任务执行完毕，输出4
 */


// 实现并发请求自动控制
// 实现一个批量请求函数 multiRequest(urls, maxNum)，要求如下：

// - 要求最大并发数 maxNum
// - 每当有一个请求返回，就留下一个空位，可以增加新的请求
// - 所有请求完成后，结果按照 urls 里面的顺序返回


const pre1 = Date.now()
function multiRequest(urls, limit) {
  const schedular = new Scheduler(limit);

  return new Promise((resolve, reject) => {
    const res = [];
    let resolveCount = 0;
    urls.forEach((url, i) => {
      schedular.addTask(() => axios.get(url).then(data => {
        res[i] = data;
        console.log(`resolve ${i} used ${Date.now() - pre}ms`)
        if (++resolveCount === urls.length) {
          resolve(res)
        }
      }))
    })
  })
}


multiRequest(Array.from({ length: 4 }, (_, i) => `http://localhost:9999/test${i}`)).then(res => {
  console.log(res)
})