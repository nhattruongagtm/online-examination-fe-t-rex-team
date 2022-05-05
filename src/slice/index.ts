import { combineReducers } from 'redux'
import classSlice from './classSlice'
import examSlice from './examSlice'
import testSlice from './testSlice'
export const rootReducer = combineReducers({
  test: testSlice,
  exam: examSlice,
  classList: classSlice,
})
