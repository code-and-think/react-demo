import { Button } from '@arco-design/web-react';
import { useEffect, useLayoutEffect, useState } from 'react';

export default function SyncRender() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('effect');
  }, [count]);

  useLayoutEffect(() => {
    console.log('layoutEffect');
  }, [count]);

  console.log('render');

  return (
    <div>
      {count}
      <Button
        onClick={() => {
          setTimeout(() => console.log('macroTask1'), 1);
          setTimeout(() => console.log('macroTask0'), 0);
          Promise.resolve().then(() => console.log('microTask'));
          setCount(count + 1);
          console.log('click handler');
        }}
      >
        按钮
      </Button>
    </div>
  );
}

// click handler -> render -> layoutEffect -> microTask -> macroTask0 -> effect -> marcoTask1

// 1. 重渲染过程中，render和layoutEffect都是同步执行的
// 根据  render -> layoutEffect -> microTask 得出，如果是异步执行的微任务的话，
// 不应该比先注册的 microTask 先执行。而执行时机在 clickHandler 之后是 React 故意设计用于实现 batchUpdate 的！

// 2. effect 是异步执行的
// 根据 macroTask0 -> effect -> macroTask1 得出，相当于 setTimeout(0) （但原理是 MessageChannel）
