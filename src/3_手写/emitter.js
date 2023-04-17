// 1. 参数中有 callback 的时候要检测类型

class EventBus {
  // 以事件名为属性名 以所有监听函数组成的数组作为属性值
  constructor() {
    this.subList = {};
  }
  on(eventName, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('error');
    }
    let curSubList = this.subList[eventName] || [];
    curSubList.push(callback);
    this.subList[eventName] = curSubList;
  }
  emit(eventName, ...args) {
    (this.subList[eventName] || []).forEach(callback => {
      callback(...args);
    });
  }
  off(eventName, callback) {
    if (!callback) {
      delete this.subList[eventName];
    } else {
      let curSubList = this.subList[eventName] || [],
        index = curSubList.indexOf(callback);
      index !== -1 && curSubList.splice(index, 1);
    }
  }
  once(eventName, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('error');
    }
    let onceCallback = (...args) => {
      callback(...args);
      this.off(eventName, onceCallback);
    };
    this.on(eventName, onceCallback);
  }
}