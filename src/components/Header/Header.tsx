import React from 'react'
import { Layout, Menu, Avatar } from 'antd'
const { SubMenu } = Menu
const { Header: Head } = Layout
const Header = () => {
  return (
    <Head className="header">
      <div className="header__logo">
        <img src="../public/img/logo.jpg" alt="" />
      </div>
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
