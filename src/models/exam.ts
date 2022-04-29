export interface Result {
  id: number
  subject: Subject
  student: Student
  duration: number
  dateExam: string
  correct: number
  total: number
}
export interface Subject {
  id: number
  name: string
  code: string
  examDate: string
  examTime: number
  grade: number
}
export interface Student {
  id: number
  fullname: string
}
