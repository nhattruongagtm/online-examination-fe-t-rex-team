export interface Class {
  classID: number
  className: string
  u: TestStudent[];
  subjectID: number
}

export interface TestStudent {
  id?: number;
  fullName?: string;
  email?:  string;
}
