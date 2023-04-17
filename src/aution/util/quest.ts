import { message } from 'antd';
import Axios from 'axios';

// 当 withCredentials 设置为 true 时，后端的 Allow-Origin 就不能为 *，
// 这时候就要设置为 Allow-Origin: 前端的协议+域名+端口号 并且 Access-Control-Allow-Credentials 需要设置为 true
// 当 withCredentials 设置为 false 时，后端可设置 Allow-Origin: * 然后 Access-Control-Allow-Credentials 设置为 false
export const quest = Axios.create({
  timeout: 60 * 1000,
  baseURL: 'https://127.0.0.1:3366/',
  withCredentials: true,
});

(window as any).quest = quest;

quest.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  err => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (err.response) {
      const { status, data } = err.response;
      switch (status) {
        case 401:
          message.error('登录信息过期或未授权，请重新登录！');
          setTimeout(() => {
            if (location.pathname !== '/login') {
              location.pathname = '/login';
            }
          }, 500);
          break;

        default:
          message.error(data.message || `连接错误 ${status}！`);
          break;
      }
    } else {
      message.error(err.message);
    }

    return Promise.reject(err);
  }
);
