import { ResponseData } from '../models/responseData'
import { clientAxios } from './clientAxios'

export const subjectApi = {
  addSubject: (
    name: string,
    code: string,
    examDate: string,
    examTime: number,
    grade: number
  ): Promise<ResponseData> => {
    const url = 'subject/add-subject'
    return clientAxios.post(url, { name, code, examDate, examTime, grade })
  },
}
