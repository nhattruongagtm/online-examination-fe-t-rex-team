import React, { useEffect, useState } from 'react'
import { TOKEN } from '../models/router'
import { LoginResponse } from '../pages/Login/Login'
import { decodeToken, isExpired } from 'react-jwt'
import { DecodedUser, TokenResp } from '../models/responseData'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../slice/authSlice'
import { userApi } from '../api/userApi'
import { User } from '../models/user'
import { RootState } from '../store'
type Props = {}

const useUser = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  return [user]
}

export default useUser
