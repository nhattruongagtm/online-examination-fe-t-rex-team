import 'antd/dist/antd.css'
import 'boxicons'
import { useEffect } from 'react'
import { decodeToken, isExpired } from 'react-jwt'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router'
import { userApi } from './api/userApi'
import { IRoute } from './components/Content/router'
import Test from './components/Content/Test/Test'
import './index.css'
import { DecodedUser, TokenResp } from './models/responseData'
import { TOKEN } from './models/router'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/ForgotPassword/ResetPassword'
import Login from './pages/Login/Login'
import Util from './pages/Util/Util'
import './scss/app.scss'
import { loadUser } from './slice/authSlice'


function App() {
  const isLogin = localStorage.getItem('e-exam')

  const dispatch = useDispatch()
  useEffect(() => {
    let isCancel = false
    const loadUserLogin = async () => {
      const token = localStorage.getItem(TOKEN)
        ? (JSON.parse(localStorage.getItem(TOKEN) as string) as TokenResp)
        : null
      if (token) {
        const myDecodedToken = decodeToken(token.access_token) as DecodedUser
        const isMyTokenExpired = isExpired(token.access_token)
        if (!isMyTokenExpired) {
          const username = myDecodedToken.sub
          const roles = myDecodedToken.roles
          try {
            const resp = await userApi.getUserByUsername(username)
            console.log(resp)
            dispatch(loadUser(resp))
          } catch (error) {}
        } else {
          // refresh token
        }
      }
    }
    loadUserLogin()

    return () => {
      isCancel = true
    }
  }, [])

  return (
    <Routes>
      <Route path={IRoute.HOME} element={<Login />} />
      <Route path={IRoute.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={IRoute.RESET_PASSWORD} element={<ResetPassword />} />

      <Route path={IRoute.TEST} element={<Test />} />
      <Route path="*" element={<Util />} />
    </Routes>
  )
}

export default App
