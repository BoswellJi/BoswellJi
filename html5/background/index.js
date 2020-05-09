setTimeout(() => {
  console.log('1');
}, 3000);
// 主线程执行完成后,没有其他任务执行时
window.requestIdleCallback((res) => {
  console.log(res);
});

window.requestIdleCallback = window.requestIdleCallback || function (handler) {
  let startTime = Date.now();
  return setTimeout(() => {
    handler({
      didTimeout: false,
      timeRemaining: () => {
        return Math.max(0, 50.0 - (Date.now() - startTime));
      }
    });
  }, 1);
}

console.log(window.requestIdleCallback);

let taskList = [];
let totalTaskCount = 0;
let currentTaskNumber = 0;
let taskHandle = null;
let logFragment = null;
let statusRefreshScheduled = false;

function enqueueTask(taskHandler) { }

function runTaskQueue(deadline) {
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && taskList.length) {
    let task = taskList.shift();
    currentTaskNumber++;
    task.handler(task.data);
    scheduleStatusRefresh();
  }

  if (taskList.length) {
    taskHandle = requestIdleCallback(runTaskQueue, { timeout: 1000 });
  } else {
    taskHandle = 0;
  }
}