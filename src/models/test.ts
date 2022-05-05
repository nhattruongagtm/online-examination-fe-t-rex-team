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
  title: string
  correct: number
  answers: AnswerRequest
}
export interface AnswerRequest {
  title: string
}
