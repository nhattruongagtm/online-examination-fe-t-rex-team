import { clientAxios } from './clientAxios'
import { SubmitAnswer } from '../models/test'
export const submitTest = {
    submitTest: (submitdata:SubmitAnswer): Promise<number> => {
        const url = '/exam/answers'
        return clientAxios.post(url, submitdata)
      },
}