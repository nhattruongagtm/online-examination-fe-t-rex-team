import { combineReducers } from 'redux'
import classSlice from './classSlice'
import examSlice from './examSlice'
import responseSlice from './responseSlice'
import subjectSlice from './subjectSlice'
import testSlice from './testSlice'
export const rootReducer = combineReducers({
  test: testSlice,
  exam: examSlice,
  subjects: subjectSlice,
  response: responseSlice
  classList: classSlice,
})
