import axios from 'axios'
import { ResponseData, TokenResp } from '../models/responseData'
import { User } from '../models/user'
import { LoginResponse } from '../pages/Login/Login'
import { clientAxios } from './clientAxios'

export const userApi = {
  login: (username: string, password: string): Promise<TokenResp> => {
    const url = '/api/login'
    let s = new URLSearchParams(
      Object.entries({ username, password })
    ).toString()
    return clientAxios.post(url, s, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
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
  getUserByUsername: (username: string): Promise<User> => {
    const url = '/user/' + username
    return clientAxios.get(url)
  },
}
