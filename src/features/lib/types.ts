export interface IFormData {
  name: string
}

export interface ITests {
  id: number
  title: string
  description: string
  questions: IQuestion[]
}

export interface IQuestion {
  id: number
  question: string
  answers: IAnswers[]
}

export interface IAnswers {
  text: number
  isCorrect: boolean
}

export interface IState {
  tests: ITests[]
  result: IResult[]
}

export interface IResult {
  name: string
}
