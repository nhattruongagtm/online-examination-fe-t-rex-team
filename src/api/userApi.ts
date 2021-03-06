import axios from 'axios'
import { ResponseData } from '../models/responseData'
import { User } from '../models/user'
import { LoginResponse } from '../pages/Login/Login'
import { clientAxios } from './clientAxios'

export const userApi = {
  login: (username: string, password: string): Promise<LoginResponse> => {
    const url = '/login'
    return clientAxios.post(url, { username, password })
  },
  changePassword: (id: number, password: string): Promise<User> => {
    const url = `/change-pass/${id}`
    return clientAxios.put(url, password)
  },
  sendEmail: (email: string): Promise<ResponseData> => {
    const url = '/user/forgot-password'
    return clientAxios.get(`${url}?email=${email}`)
  },
  resetPassword: (
    token: string,
    confirmNewPassword: string
  ): Promise<ResponseData> => {
    const url = '/user/reset-password'
    return clientAxios.get(
      `${url}?token=${token}&password=${confirmNewPassword}`
    )
  },
  getUserByID: (id: number): Promise<User> => {
    const url = `/getUserByID/${id}`
    return clientAxios.get(url)
  },
}
