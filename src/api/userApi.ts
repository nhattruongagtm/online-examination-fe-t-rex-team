import { User } from '../models/user'
import { LoginResponse } from '../pages/Login/Login'
import { clientAxios } from './clientAxios'

export const userApi = {
  login: (username: string, password: string): Promise<LoginResponse> => {
    const url = '/login'
    return clientAxios.post(url, { username, password })
  },
  changePassword: (id: number, password: string): Promise<User> => {
    const url = '/change-pass'

    return clientAxios.put(url, id)
  },
}
