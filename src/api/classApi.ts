import { ResponseData, ResponseDataClass } from '../models/responseData'
import { clientAxios } from './clientAxios'

export const classApi = {
  addClass: (code: string, name: string): Promise<ResponseDataClass> => {
    const url = '/getAllClass'
    return clientAxios.post(url, { name, code })
  },
}
