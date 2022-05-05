import React from 'react'
import { LoginResponse } from '../pages/Login/Login'
type Props = {}

const useUser = () => {
  const user = localStorage.getItem('e-exam')
    ? (JSON.parse(localStorage.getItem('e-exam') as string) as LoginResponse)
    : null
  return [user]
}

export default useUser
