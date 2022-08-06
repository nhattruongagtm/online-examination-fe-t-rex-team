import { Layout, Menu } from 'antd'
import 'antd/dist/antd.css'
import 'boxicons'
import { Navigate, Route, Routes, useNavigate } from 'react-router'

import { IRoute } from './components/Content/router'
import './index.css'
import Login from './pages/Login/Login'
import Util from './pages/Util/Util'
import Test from './components/Content/Test/Test'
import './scss/app.scss'
import { useCountDown } from './hook/useCountDown'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/ForgotPassword/ResetPassword'

function App() {
  const isLogin = localStorage.getItem('e-exam')

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
