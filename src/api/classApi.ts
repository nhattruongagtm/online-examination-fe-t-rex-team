import { ResponseData, ResponseDataClass } from '../models/responseData'
import { clientAxios } from './clientAxios'

export const classApi = {
  addClass: (
    classID: number,
    className: string
  ): Promise<ResponseDataClass> => {
    const url = `/subject/${classID}/addClass`
    return clientAxios.post(url, { className })
  },
}
