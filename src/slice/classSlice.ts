import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Action } from 'history'
import { Class } from '../models/class'

interface ClassState {
  classList: Class[]
}
const initialState: ClassState = {
  classList: [],
}
const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    loadClassList: (state, action: PayloadAction<Class[]>) => {
      state.classList = action.payload
    },
    createClass: (state, action: PayloadAction<Class>) => {
      state.classList.push(action.payload)
    },
  },
})
export const { loadClassList, createClass } = classSlice.actions

export default classSlice.reducer
