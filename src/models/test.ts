export interface Question {
  id: number
  title: string
  answers: Answer[]
  correct: number[]
  imgs?: string
  choose: number[]
  flag: boolean
  status: 0 | 1
  // 0 is uncheck, 1 is checked
}

export interface Answer {
  id: number
  title: string
}

export type Test = Question[]
