import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Action } from 'history'
import { Class } from '../models/class'
import { User } from '../models/user'

interface StudentState {
  student: User[]
}
const initialState: StudentState = {
  student: [],
}
const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    loadStudentList: (state, action: PayloadAction<User[]>) => {
      state.student = action.payload
    },
    createStudent: (state, action: PayloadAction<User>) => {
      state.student.push(action.payload)
    },
  },
})
export const { loadStudentList, createStudent } = studentSlice.actions

export default studentSlice.reducer
