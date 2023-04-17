import { quest } from "../../util/quest";


export interface ILoginParams {
  username: string;
  password: string;
  code: string;
  auto: boolean;
}

export interface IUser {
  username: string;
  password: string;
  role: 0 | 1;
}

export interface IForgetPwd {
  username: string;
  prePwd: string;
  curPwd: string;
}

class UserService {
  async login(params: ILoginParams) {
    return quest.post('/login', params);
  }
  async autoLogin(params: Pick<ILoginParams, 'username'>) {
    return quest.post('/autoLogin', params);
  }
  async logout() {
    return quest.post('/logout');
  }
  async register(params: IUser) {
    return quest.post('/register', params);
  }
  async forgetPwd(params: IForgetPwd) {
    return quest.post('/forgetPwd', params);
  }
}

export const userService = new UserService();
