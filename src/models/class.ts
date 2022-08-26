export interface Class {
  classID: number
  className: string
  u: TestStudent[]
  subjectID: number
}

export interface TestStudent {
  id?: number
  fullName?: string
  email?: string
}
export interface ViewMark {
  id: number
  fullname: string
  correct: number
  total: number
  createDate: string
  mark: number
}