/** 1. 什么是swr???
 - 全称是stale-while-revalidate，是一种HTTP缓存失效策略。这种策略首先从缓存中返回数据（过期的）,同时发送最新的f请求（重新验证）,最后得到最新数据并展示。
 - 通过 swr 来管理服务端状态，相当于将服务端状态提升至全局，避免出现由顶层组件请求数据后需要通过 props 层层下发的情况
 */

/** 2. swr配置详解
  - cacheTime 影响的是能不能获取到旧数据，不影响是否发送请求
  - staleTime 影响是否发送请求
  - 如果想永不重新发起请求的话，staleTime 和 cacheTime 必须都设置为 -1。如果只设置 staleTime 的话，会在缓存失效后重新请求。由此得出：当 staleTime 大于 cacheTime 时会被强行拉到 cacheTime。
  - 只有请求成功的数据才会缓存，所以在请求过程中再次触发时会忽视 staleTime。
  - ready是对所有请求的控制，只有当 ready 为 true 时才会发起请求，而且每当 ready 从 false 转化为 true 时会触发一次自动请求。
  */

import { Button, Spin } from '@arco-design/web-react';
import { useRequest } from 'ahooks';

const { SWRPage1, Avatar1, Content1, Navbar1 } = {
  SWRPage1() {
    const { loading, data } = useRequest(getUserInfo);

    // 全局加载状态
    return loading ? (
      <Spin />
    ) : (
      <div>
        <Navbar1 user={data} />
        <Content1 user={data} />
      </div>
    );
  },
  // 子组件
  Navbar1({ user }: { user: any }) {
    return (
      <div>
        ...
        <Avatar1 user={user} />
      </div>
    );
  },
  Content1({ user }: { user: any }) {
    return <h1>Welcome back, {user.name}</h1>;
  },
  Avatar1({ user }: { user: any }) {
    return <img src={user.avatar} alt={user.name} />;
  },
};

const { Avatar2, Content2, Navbar2, SWRPage2, useUser } = {
  SWRPage2() {
    const { run } = useUser();

    return (
      <div>
        <Button onClick={run} children="Refresh" />
        <Navbar2 />
        <Content2 />
      </div>
    );
  },
  useUser() {
    return useRequest(getUserInfo, { cacheKey: 'user' });
  },

  // 子组件
  Navbar2() {
    return (
      <div>
        ...
        <Avatar2 />
      </div>
    );
  },
  Content2() {
    const { data, loading } = useUser();
    return !data || loading ? <Spin /> : <h1>Welcome back, {data.name}</h1>;
  },

  Avatar2() {
    const { data, loading } = useUser();
    return !data || loading ? <Spin /> : <img src={data.avatar} alt={data.name} />;
  },
};

const getUserInfo = () => {
  console.log('request');
  return new Promise<Record<'name' | 'avatar', string>>(resolve => {
    setTimeout(resolve, 1500, {
      name: 'luzhihao' + Date.now(),
      avatar: 'https://ahooks.js.org/simple-logo.svg',
    });
  });
};

export { SWRPage1, SWRPage2 };
