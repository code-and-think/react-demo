import { useUpdateLayoutEffect } from 'ahooks';
import { Spin } from 'antd';
import 'dayjs/locale/zh-cn';
import React, { useLayoutEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Home from './pages/Home';
import useAutoLogin from './hooks/useAutoLogin';
import Login, { useUserInfo } from './pages/Login';
import { userService } from './pages/Login/api';

export default function App() {
  const userInfo = useUserInfo();
  const [routes, setRoutes] = useState([] as any[]);
  const [autoUsername, setAutoUsername] = useAutoLogin();

  useLayoutEffect(() => {
    if (autoUsername) {
      userService.autoLogin({ username: autoUsername }).then(
        data => {
          useUserInfo.setState(data.data);
        },
        () => {
          setAutoUsername('');
          userInfo.reset();
        }
      );
    } else {
      userInfo.reset();
    }
  }, []);

  useUpdateLayoutEffect(() => {
    setRoutes(
      userInfo.username
        ? [<Route exact path="/" component={Home} />]
        : [<Route path="/login" component={Login} />]
    );
  }, [userInfo]);

  return (
    <BrowserRouter>
      {routes.length === 0 ? (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <>
          {React.Children.toArray(routes)}
          {<Redirect to={(routes.at(-1) as any).props.path} />}
        </>
      )}
    </BrowserRouter>
  );
}
