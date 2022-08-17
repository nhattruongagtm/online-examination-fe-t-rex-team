import { CheckExam } from '../models/exam'
import { CreateExamRequest, ResponseData } from '../models/responseData'
import { ExamModel, ExamTest } from '../slice/examSlice'
import { clientAxios } from './clientAxios'
import { ExamResp, Test, TestResp } from '../models/test'
import { Subject } from '../models/subject'
import { FormInput } from '../pages/Subject/CreateExam'

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
  saveRefAnswers: (params: any): Promise<TestResp> => {
    const url = '/refAnswer'
    return clientAxios.post(url, params)
  },
  isTested: (uid: number, eid: number): Promise<boolean> => {
    const url = `/test/user/${uid}/exam/${eid}`
    return clientAxios.get(url)
  },
  updateQuestion: (params: any): Promise<any> => {
    const url = '/question/' + params.id
    return clientAxios.put(url, params)
  },
  deleteQuestion: (id: number): Promise<any> => {
    const url = '/question/' + id
    return clientAxios.delete(url)
  },
  updateAnswer: (params: any): Promise<any> => {
    const url = '/answer/' + params.id
    return clientAxios.put(url, params)
  },
  deleteAnswer: (id: number): Promise<any> => {
    const url = '/answer/' + id
    return clientAxios.delete(url)
  },
  updateExam: (id: number, params: FormInput & CreateExamRequest) => {
    const url = '/exam/' + id
    return clientAxios.put(url, params)
  },
}
