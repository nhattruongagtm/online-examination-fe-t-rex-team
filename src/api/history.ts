import { Result } from '../models/exam'
import { clientAxios } from './clientAxios'
export const examApi = {
  getHistory: (studentID: number): Promise<Result[]> => {
    const url = '/examHistory/' + studentID
    return clientAxios.get(url)
  },
}
