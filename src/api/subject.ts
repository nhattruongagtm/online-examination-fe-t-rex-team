import { Class } from '../models/class'
import { ResponseData } from '../models/responseData'
import { Subject } from '../models/subject'
import { clientAxios } from './clientAxios'

export const subjectApi = {
  addSubject: (name: string, code: string): Promise<ResponseData> => {
    const url = 'subject/add-subject/1'
    return clientAxios.post(url, { code, name })
  },

  deleteSubject: (id: any): Promise<ResponseData> => {
    const url = `subject/${id}`
    return clientAxios.delete(url)
  },
  getAllSubject: (): Promise<Subject[]> => {
    const url = `getAllSubject`
    return clientAxios.get(url)
  },
  getAllClass: (id: any): Promise<Class[]> => {
    const url = `getAllClass/${id}`
    return clientAxios.get(url)
  },
}
