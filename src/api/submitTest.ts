import { clientAxios } from './clientAxios'
import { ResponseResult, SubmitAnswer } from '../models/test'
export const submitTest = {
  submitTest: (submitdata: SubmitAnswer): Promise<ResponseResult> => {
    const url = '/exam/answers'
    return clientAxios.post(url, submitdata)
  },
}
