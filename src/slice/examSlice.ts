import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isTypeNode } from 'typescript'
import { number } from 'yup/lib/locale'
import { Question } from '../models/test'
import { CreateInput } from '../pages/Subject/CreateExam'

export interface ExamModel {
  questionList: CreateInput[]
}
export const initialState: ExamModel = {
  questionList: [],
}
const examSlice = createSlice({
  name: 'createExam',
  initialState,
  reducers: {
    loadQuestions: (state, action: PayloadAction<CreateInput[]>) => {
      state.questionList = action.payload
    },
    updateQuestion: (state, action: PayloadAction<CreateInput>) => {
      const index = state.questionList.findIndex(
        (item) => item.id === action.payload.id
      )
      if (index > -1) {
        state.questionList[index] = action.payload
      }
    },
    deleteQuestion: (state, action: PayloadAction<number>) => {
      const index = state.questionList.findIndex(
        (item) => item.id === action.payload
      )

      if (index > -1) {
        // state.questionList.filter((item) => item.id === action.payload)
        state.questionList.splice(index, 1)
      }
    },
    addQuestion: (state, action: PayloadAction<CreateInput>) => {
      state.questionList.push(action.payload)
    },
  },
})

export const { addQuestion, deleteQuestion, loadQuestions, updateQuestion } =
  examSlice.actions

export default examSlice.reducer
