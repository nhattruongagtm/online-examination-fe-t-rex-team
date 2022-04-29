import { ResponseData } from '../models/responseData'
import { clientAxios } from './clientAxios'

export const subjectApi = {
  addSubject: (name: string, code: string): Promise<ResponseData> => {
    const url = 'subject/add-subject/1'
    return clientAxios.post(url, { name, code })
  },
}
