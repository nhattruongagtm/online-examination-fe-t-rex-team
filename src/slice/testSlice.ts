import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Answer, Question, Test } from '../models/test'
export interface ITestSlice {
  test: Test
  item: number
  mark: number
  choose: ChooseAnswer[]
}
const initialState: ITestSlice = {
  test: [],
  item: -1,
  mark: 0,
  choose: [],
}
export interface ChooseAnswer {
  id: number
  answer: number
}
export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    loadTest: (state, action: PayloadAction<Test>) => {
      state.test = action.payload
    },
    updateTest: (state, action: PayloadAction<Question>) => {
      const index = state.test.findIndex((item) => item.id)
      if (index > -1) {
        state.test[index] = action.payload
      }
    },
    submitTest: (state, action: PayloadAction<Test>) => {
      state.mark = 0
    },
    flagQuestion: (state, action: PayloadAction<number>) => {
      const index = state.test.findIndex((item) => item.id === action.payload)
      if (index > -1) {
        state.test[index].flag = !state.test[index].flag
      }
    },
    chooseAnswer: (state, action: PayloadAction<ChooseAnswer>) => {
      const index = state.test.findIndex(
        (item) => item.id === action.payload.id
      )
      const index1 = state.choose.findIndex(
        (item) => item.id === action.payload.id
      )
      if (index > -1) {
        if (index1 > -1) {
          state.choose[index1].answer = action.payload.answer
        } else {
          state.choose.push(action.payload)
        }
      }
    },
  },
})

export const { loadTest, updateTest, submitTest, flagQuestion, chooseAnswer } =
  testSlice.actions

export default testSlice.reducer
