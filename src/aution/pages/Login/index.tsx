import {
  ExclamationCircleOutlined,
  LockOutlined,
  SendOutlined,
  SwitcherOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input, message, Select, Tabs } from 'antd';
import { css } from '@emotion/css';
import { useLayoutEffect, useState } from 'react';
import create from 'zustand';
import { quest } from '../../util/quest';
import { IForgetPwd, ILoginParams, IUser, userService } from './api';
import useAutoLogin from '../../hooks/useAutoLogin';
import { useQuery } from '../../hooks/useQuery';

export const useUserInfo = create<IUser & { reset: () => void }>(set => ({
  username: '',
  password: '',
  role: 0,
  reset: () => set({ username: '', password: '', role: 0 }),
}));
(window as any).useUserInfo = useUserInfo;

export default () => {
  const [loginForm] = Form.useForm<ILoginParams>();
  const [registerForm] = Form.useForm<IUser>();
  const [forgetPwdForm] = Form.useForm<IForgetPwd>();

  const [count, setCount] = useState(0);
  const { value, setValue } = useQuery('tab');
  const [html, setHtml] = useState('');
  const [, setAutoUsername] = useAutoLogin();

  useLayoutEffect(() => {
    quest('/code').then(data => {
      setHtml(data.data.img);
      console.log(data.data.code);
    });
  }, [count]);

  return (
    <div
      style={{
        display: 'flex',
        background: '#eee',
        padding: '40px 0',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card style={{ width: 400 }}>
        <Tabs style={{ overflow: 'visible', marginTop: -10 }} activeKey={value} onChange={setValue}>
          <Tabs.TabPane key="1" tab="登录">
            <Form
              form={loginForm}
              layout="vertical"
              size="large"
              onFinish={params =>
                userService.login(params).then(data => {
                  setAutoUsername(params.username, params.auto ? localStorage : sessionStorage);
                  useUserInfo.setState(data.data);
                })
              }
            >
              <Form.Item
                name="username"
                label="用户名"
                rules={[{ required: true, message: '用户名不能为空' }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                name="password"
                label="密码"
                rules={[{ required: true, message: '密码不能为空' }]}
              >
                <Input type="password" prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item
                className={css({
                  '.ant-form-item-control-input-content': {
                    display: 'flex',
                    columnGap: 12,
                  },
                })}
                label="验证码"
                required
              >
                <Form.Item name="code" noStyle>
                  <Input prefix={<ExclamationCircleOutlined />} />
                </Form.Item>
                <div
                  ref={dom => {
                    if (dom) {
                      dom.innerHTML = html;
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setCount(count + 1)}
                />
              </Form.Item>

              <Form.Item
                className={css({
                  '.ant-form-item-control-input-content': {
                    display: 'flex',
                    alignItems: 'center',
                    '> *': {
                      flex: 1,
                    },
                  },
                })}
              >
                <Form.Item name="auto" noStyle valuePropName="checked">
                  <Checkbox children="下次自动登录" />
                </Form.Item>
                <Button type="primary" htmlType="submit" block size="large">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="注册">
            <Form
              form={registerForm}
              layout="vertical"
              size="large"
              onFinish={params =>
                userService.register(params).then(() => message.success('注册成功'))
              }
            >
              <Form.Item
                name="username"
                label="用户名"
                rules={[{ required: true, message: '用户名不能为空' }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                name="password"
                label="密码"
                rules={[{ required: true, message: '密码不能为空' }]}
              >
                <Input type="password" prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item
                name="role"
                label="角色"
                rules={[{ required: true, message: '角色不能为空' }]}
              >
                <Select
                  options={[
                    { label: '普通用户', value: 0 },
                    { label: '管理员', value: 1 },
                  ]}
                />
              </Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                注册
              </Button>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane key="3" tab="忘记密码">
            <Form
              form={forgetPwdForm}
              layout="vertical"
              size="large"
              onFinish={params => {
                userService.forgetPwd(params).then(() => message.success('修改成功'));
              }}
            >
              <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '用户名不能为空' }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                label="当前密码"
                name="password"
                rules={[{ required: true, message: '当前密码不能为空' }]}
              >
                <Input prefix={<LockOutlined />} type="password" />
              </Form.Item>
              <Form.Item
                label="新密码"
                name="curPwd"
                rules={[{ required: true, message: '新密码不能为空' }]}
              >
                <Input prefix={<SendOutlined />} name="curPwd" title="新密码" type="password" />
              </Form.Item>
              <Form.Item
                label="重复新密码"
                name="test"
                required
                rules={[
                  form => ({
                    validator: (_, store, cb) =>
                      new Promise<void>((resolve, reject) => {
                        if (store !== form.getFieldValue('curPwd')) {
                          reject('与新密码不一致！');
                        }
                        resolve();
                      }),
                  }),
                ]}
              >
                <Input type="password" prefix={<SwitcherOutlined />} />
              </Form.Item>

              <Button type="primary" htmlType="submit" block size="large">
                确定修改
              </Button>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};
