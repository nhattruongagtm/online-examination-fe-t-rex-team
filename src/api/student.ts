import { Class } from '../models/class'
import { ResponseData, ResponseDataClass } from '../models/responseData'
import { clientAxios } from './clientAxios'

export const studentApi = {
  addStudent: (classID: string, className: string): Promise<ResponseDataClass> => {
    const url = '/addClass'
    return clientAxios.post(url, { classID, className })
  },
}
export const fetchStudent = {
    fetchDataStudent: (classID: number): Promise<Class[]> => {
      const url = `getUserByClassID/${classID}`
      return clientAxios.get(url);
    },
  }