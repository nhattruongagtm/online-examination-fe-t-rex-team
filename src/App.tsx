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

function App() {
  const isLogin = localStorage.getItem('e-exam')

  const navigate = useNavigate()
  if (!isLogin) {
    return <Login />
  }
  return (
    <>
      <Routes>
        <Route path={IRoute.TEST} element={<Test />} />
        <Route path="*" element={<Util />} />
      </Routes>
    </>
  )
}

export default App
