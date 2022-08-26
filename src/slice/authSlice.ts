import { User } from '../models/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export interface AuthSlice {
  user: User | null
}

const initialState: AuthSlice = {
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  },
})

export const { loadUser } = authSlice.actions

export default authSlice.reducer
