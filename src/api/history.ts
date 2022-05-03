import { Result } from '../models/exam'
import { CreateExamRequest } from '../models/responseData'
import { clientAxios } from './clientAxios'
export const examApi = {
  getHistory: (studentID: number): Promise<Result[]> => {
    const url = '/examHistory/' + studentID
    return clientAxios.get(url)
  },
  createExam: (params: CreateExamRequest): Promise<string> => {
    const url = '/exam/question'
    return clientAxios.post(url, params)
  },
}
