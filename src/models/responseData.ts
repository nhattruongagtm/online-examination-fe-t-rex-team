import { QuestionRequest } from './test'

export interface ResponseData {
  status: string
  message: string
  object: Object
}

export interface CreateExamRequest {
  listQuestions: QuestionRequest[]
}
export interface ResponseDataClass {
  status: string
  message: string
  object: Object
}
