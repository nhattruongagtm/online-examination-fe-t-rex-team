import { ResponseData, ResponseDataClass } from '../models/responseData'
import { clientAxios } from './clientAxios'

export const classApi = {
  addClass: (classID: string, className: string): Promise<ResponseDataClass> => {
    const url = '/addClass'
    return clientAxios.post(url, { classID, className })
  },
}
