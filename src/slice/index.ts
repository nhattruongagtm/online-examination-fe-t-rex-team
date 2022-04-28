import { combineReducers } from 'redux'
import examSlice from './examSlice'
import testSlice from './testSlice'
export const rootReducer = combineReducers({
  test: testSlice,
  exam: examSlice,
})
