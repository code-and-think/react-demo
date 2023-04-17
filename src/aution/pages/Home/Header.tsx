import { Typography } from 'antd';
import { keyframes } from '@emotion/css';
import useAutoLogin from '../../hooks/useAutoLogin';
import logo from '../../assets/logo.svg';
import { useUserInfo } from '../Login';
import { userService } from '../Login/api';

export default function Header() {
  const { username, role, reset } = useUserInfo();
  const [, setAutoUsername] = useAutoLogin();

  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src={logo}
        style={{
          animation: `${keyframes` 
          0% {
            transform: rotate(0deg);
          }
            100% {
              transform: rotate(360deg);
          }
      `} infinite 20s linear`,
          pointerEvents: 'none',
          width: 70,
        }}
        alt="logo"
      />
      <h2 style={{ marginBottom: 0 }}>在线拍卖系统</h2>
      <Typography.Text style={{ marginLeft: 16, alignSelf: 'flex-end' }}>{`欢迎你！！！${
        { 0: '用户', 1: '管理员' }[role]
      }：${username} 你可以点击`}</Typography.Text>
      <Typography.Link
        style={{ alignSelf: 'flex-end' }}
        onClick={() => {
          userService.logout().then(() => {
            reset();
            setAutoUsername('');
          });
        }}
      >
        注销
      </Typography.Link>
    </header>
  );
}
