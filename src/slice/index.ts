import { combineReducers } from 'redux'
import testSlice from './testSlice'
export const rootReducer = combineReducers({
  test: testSlice,
})
