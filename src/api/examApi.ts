import { CheckExam } from '../models/exam'
import { CreateExamRequest } from '../models/responseData'
import { ExamModel, ExamTest } from '../slice/examSlice'
import { clientAxios } from './clientAxios'
import { ExamResp, Test } from '../models/test'
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
  loadTest: async (id: number): Promise<ExamResp> => {
    const url = `/question/` + id
    return await clientAxios.get(url)
  },
  loadExamByStudent: (id: number): Promise<Subject[]> => {
    const url = `/exams/${id}`
    return clientAxios.get(url)
  },
  loadExamBySubject: (id: number): Promise<ExamTest> => {
    const url = `/exam/subject/${id}`
    return clientAxios.get(url)
  },
  saveRefAnswers: (params: any): Promise<boolean> => {
    const url = '/refAnswer'
    return clientAxios.post(url, params)
  },  
}
