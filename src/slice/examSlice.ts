import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { CreateInput } from '../pages/Subject/CreateExam'

export interface ExamModel {
  questionList: CreateInput[]
  edit: CreateInput
}
export const initialState: ExamModel = {
  questionList: [],
  edit: {
    id: -1,
    title: '',
    correct: 1,
    answers: [
      {
        id: 1,
        title: '',
      },
      {
        id: 2,
        title: '',
      },
      {
        id: 3,
        title: '',
      },
      {
        id: 4,
        title: '',
      },
    ],
  },
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
        state.questionList.splice(index, 1)
      }
    },
    addQuestion: (state, action: PayloadAction<CreateInput>) => {
      state.questionList.push(action.payload)
    },
    loadEdit: (state, action: PayloadAction<CreateInput>) => {
      state.edit = action.payload
    },
    resetEdit: (state) => {
      state.edit = initialState.edit
    },
  },
})

export const {
  addQuestion,
  deleteQuestion,
  loadQuestions,
  updateQuestion,
  loadEdit,
  resetEdit,
} = examSlice.actions

export default examSlice.reducer
