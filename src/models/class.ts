export interface Class {
  classID: number
  className: string
  u: TestStudent[];
}

export interface TestStudent {
  id?: number;
  fullName?: string;
  email?:  string;
}
