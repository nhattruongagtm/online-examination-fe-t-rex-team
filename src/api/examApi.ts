import { CheckExam } from '../models/exam'
import { CreateExamRequest } from '../models/responseData'
import { ExamModel } from '../slice/examSlice'
import { clientAxios } from './clientAxios'
import { Test } from '../models/test'
import { Subject } from '../models/subject'

export const examApi = {
  createExam: (params: CreateExamRequest): Promise<string> => {
    const url = '/exam/question'
    return clientAxios.post(url, params)
  },
  loadSubjectByTeacherID: (id: number): Promise<Subject[]> => {
    const url = '/subject/teacher'
    return clientAxios.post(url, id)
  },
  checkTest: (id: number, params: CheckExam): Promise<boolean> => {
    const url = `/checkTest/${id}`
    return clientAxios.post(url, params)
  },
  loadTest: async (id: number): Promise<Test> => {
    const url = `/exam/question/doing`
    return await clientAxios.post(url, id)
  },
}
