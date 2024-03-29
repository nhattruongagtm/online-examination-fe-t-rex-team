import { ChooseAnswer } from '../slice/testSlice'

export interface Question {
  id: number
  title: string
  answers: Answer[]
  correct: number
  imgs?: string
  choose: number
  flag: boolean
  status: 0 | 1
  // 0 is uncheck, 1 is checked
}

export interface Answer {
  id: number
  title: string
}

export type Test = Question[]

export interface SubmitAnswer {
  studentId: number
  subjectId: number
  answers: ChooseAnswer[]
}
export interface ResponseResult {
  correct: number
  total: number
}
export interface DateTime {
  day: number
  month: number
  year: number
}
export interface TestCode {
  id: number
  date: DateTime
  dateString: string
}
export interface QuestionRequest {
  id?: number
  title: string
  correct: string
  answers: AnswerRequest | Answer[]
}
export interface AnswerRequest {
  title: string
}
export interface QuestionResp {
  id: number
  title: string
  answers: Answer[]
  correct: number
}
export interface ExamResp {
  subjectID: number
  name: string
  time: string
  date: string
  duration: number
  listQuestions: Question[]
  dateTime: string
}

export interface TestResp {
  examId: string
  subjectName: string
  correct: number
  total: number
  createdDate: number
  isTest: boolean
}
