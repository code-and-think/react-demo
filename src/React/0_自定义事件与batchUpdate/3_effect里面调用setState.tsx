import { Button } from '@arco-design/web-react';
import { useState, useEffect, useLayoutEffect } from 'react';

export default function EffectSequence() {
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);

  useEffect(() => {
    console.log('parent effect');

    // setCount1(count1 => count1 + 1); // 1
    setCount1(count1 => count1 + 1); // 2
  }, [count]);

  useLayoutEffect(() => {
    console.log('parent layoutEffect');
    // setCount1(count1 => count1 + 1); // 1
  }, [count]);

  console.log('parent render', { count, count1 });

  return (
    <div>
      {count} --- {count1}
      <div
        onClick={() => {
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
  const [count1, setCount1] = useState(0);

  useEffect(() => {
    console.log('child effect');
    // setCount1(count1 => count1 + 1); // 1
    setCount1(count1 => count1 + 1); // 2
    Promise.resolve().then(() => {
      console.log('child effect promise ');
    });
  }, [count]);

  useLayoutEffect(() => {
    console.log('child layoutEffect');
    // setCount1(count1 => count1 + 1); // 1
    Promise.resolve().then(() => {
      console.log('child layoutEffect promise ');
    });
  }, [count]);

  console.log('child render', { count, count1 });

  return (
    <div>
      {count} --- {count1}
      <Button
        onClick={() => {
          setCount(count + 1);
          console.log('child clickHandler');
          Promise.resolve().then(() => {
            console.log('click handler promise ');
          });
        }}
      >
        按钮
      </Button>
    </div>
  );
};
// 在 情况1 下点击按钮
//  child clickHandler
//  parent clickHandler
//  parent render {count: 1, count1: 2}
//  child render {count: 1, count1: 2}
//  child layoutEffect
//  parent layoutEffect
//  child effect
//  parent effect
//  parent render {count: 1, count1: 4}
//  child render {count: 1, count1: 4}
//  click handler promise
//  child layoutEffect promise
//  child effect promise

// 会出现 handler promise 反而在 child effect 后面执行，因为在执行 child layout effect 的时候发现调用了 setCount，
// 那么之后的 effect 就直接同步执行，然后再 batchUpdate

// 在 情况2 下点击按钮
//  child clickHandler
//  parent clickHandler
//  parent render {count: 1, count1: 1}
//  child render {count: 1, count1: 1}
//  child layoutEffect
//  parent layoutEffect
//  click handler promise 
//  child layoutEffect promise 
//  child effect
//  parent effect
//  parent render {count: 1, count1: 2}
//  child render {count: 1, count1: 2}
//  child effect promise 

// effect 还是异步执行，在执行的时候同样发现了 setCount，所以直接同步执行完所有 effect 后统一 batchUpdate

// 所以总结起来就是，react 从 setState 到 render + layoutEffect 的流程永远是同步的。