import { Layout, Menu } from 'antd'
import 'antd/dist/antd.css'
import 'boxicons'
import { Navigate, Route, Routes, useNavigate } from 'react-router'

import { IRoute } from './components/Content/router'
import './index.css'
import Login from './pages/Login/Login'
import Util from './pages/Util/Util'
import './scss/app.scss'
import { useEffect } from 'react'
import { testApi } from './api/demoApi'

function App() {
  const isLogin = localStorage.getItem('e-exam')

  const navigate = useNavigate()
  if (!isLogin) {
    return <Login />
  }
  return <Util />
}

export default App
