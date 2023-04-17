import { Button } from '@arco-design/web-react';
import { useState, useEffect, useLayoutEffect } from 'react';

export default function BatchUpdate() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('parent effect');
  }, [count]);

  useLayoutEffect(() => {
    console.log('parent layoutEffect');
  }, [count]);

  console.log('parent render');

  return (
    <div>
      {count}
      <div
        onClick={() => {
          setTimeout(() => console.log('parent macroTask1'), 1);
          setTimeout(() => console.log('parent macroTask0'), 0);
          Promise.resolve().then(() => console.log('parent microTask'));
          setCount(count + 1);
          console.log('parent clickHandler');
        }}
      >
        <Child />
      </div>
    </div>
  );
}

const Child = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('child effect');
  }, [count]);

  useLayoutEffect(() => {
    console.log('child layoutEffect');
  }, [count]);

  console.log('child render');

  return (
    <div>
      {count}
      <Button
        onClick={() => {
          setTimeout(() => console.log('child macroTask1'), 1);
          setTimeout(() => console.log('child macroTask0'), 0);
          Promise.resolve().then(() => console.log('child microTask'));
          setCount(count + 1);
          console.log('child clickHandler');
        }}
      >
        按钮
      </Button>
    </div>
  );
};
// 点击按钮后
// child clickHandler -> parent clickHandler -> parent render -> child render -> 
// child layoutEffect -> parent layoutEffect -> child microTask -> parent microTask 
// -> child macroTask0 -> child effect -> parent effect -> parent macroTask0 -> child macroTask1 -> parent marckTask1

// 1. 因为原生 html 的冒泡传播是异步的，所以 React 通过自定义事件实现同步传播，在同步执行所有 handler 函数后进行 batchUpdate 统一更新
// 通过 child clickHandler -> parent clickHandler -> parent render -> child render -> child layoutEffect 
// -> parent layoutEffect -> child microTask，所有 render / layoutEffect 都在微任务前执行得出。

// 2. 为什么 render 是从父组件到子组件执行，而 layoutEffect / effect 是从子组件到父组件执行？？？
// 对于 render：因为是先 render 父组件才会 render 子组件。
// 对于 layoutEffect / effect：虽然是父组件先注册但会先执行子组件的也是为了当在 effect 里面执行 setState 时也能 batchUpdate
