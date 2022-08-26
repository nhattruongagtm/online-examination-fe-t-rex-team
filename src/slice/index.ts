import { combineReducers } from 'redux'
import authSlice from './authSlice'
import classSlice from './classSlice'
import examSlice from './examSlice'
import responseSlice from './responseSlice'
import studentSlice from './studentSlice'
import subjectSlice from './subjectSlice'
import testSlice from './testSlice'
export const rootReducer = combineReducers({
  test: testSlice,
  exam: examSlice,
  subjects: subjectSlice,
  response: responseSlice,
  classList: classSlice,
  studentList: studentSlice,
  auth: authSlice,
})
