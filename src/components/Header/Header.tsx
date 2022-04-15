import React from 'react'
import { Layout, Menu, Avatar } from 'antd'
import { InputForm } from '../../pages/Login/Login'
const { SubMenu } = Menu
const { Header: Head } = Layout
const Header = () => {
  let authPermission: InputForm = {
    username: '',
    password: '',
    type: 0,
    remember: false,
  }

  if (localStorage.getItem('e-exam') !== null) {
    authPermission = JSON.parse(localStorage.getItem('e-exam') as string)
  }

  return (
    <Head className="header">
      <div className="header__logo">
        <img src="../public/img/logo.jpg" alt="" />
      </div>
      <p>{authPermission.type === 0 ? 'Trang sinh viên' : 'Trang Giáo viên'}</p>
      <div className="header__user">
        <span className="header__name">Nguyen Van A</span>
        <Avatar
          style={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
          }}
        >
          U
        </Avatar>
        <div className="header__menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </Head>
  )
}
export default Header
