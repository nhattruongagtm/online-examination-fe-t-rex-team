import { Class } from '../models/class'
import { ResponseData, ResponseDataClass } from '../models/responseData'
import { User } from '../models/user'
import { clientAxios } from './clientAxios'

export const studentApi = {
  addStudent: (classID: string, className: string): Promise<ResponseDataClass> => {
    const url = '/addClass'
    return clientAxios.post(url, { classID, className })
  },
}
export const fetchStudent = {
    fetchDataStudent: (classID: number): Promise<User[]> => {
      const url = `getUserByClassID/${classID}`
      return clientAxios.get(url);
    },
    getAllStudent(): Promise<User[]> {
      const url = 'getAllStudent'
      return clientAxios.get(url);
    },
    addStuToClass: (id:number,className: string,classID: number): Promise<Class> => {
      const url = `/addStuToClass/${id}`
      return clientAxios.post(url,{className,classID});
    }
  }