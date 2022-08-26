import { ViewMark } from '../models/class'
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
  getAllMarks: (subjectId: number, classesId: number): Promise<ViewMark[]> => {
    const url = `/subjects/${subjectId}/classes/${classesId}/getMarks`
    return clientAxios.get(url)
  },
}
