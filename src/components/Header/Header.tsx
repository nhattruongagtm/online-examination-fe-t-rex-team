import React from 'react'
import { Layout, Avatar } from 'antd'
import { InputForm, LoginResponse } from '../../pages/Login/Login'
import { InfoCircleOutlined, LogoutOutlined } from '@ant-design/icons'
import { Modal, Button, Space } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'

const { confirm } = Modal

const { Header: Head } = Layout
const Header = () => {
  const navigate = useNavigate()
  const user = JSON.parse(
    localStorage.getItem('e-exam') as string
  ) as LoginResponse
  const showConfirm = () => {
    confirm({
      title: 'Bạn có muốn đăng xuất tài khoản này không?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        localStorage.removeItem('e-exam')
        navigate('/')
      },
      onCancel() {},
    })
  }

  return (
    <Head className="header">
      <div className="header__logo"></div>
      <div className="header__user">
        <span className="header__name" >{user && user.name}</span>
        {user && user.photoUrl === '' ? (
          <Avatar
            style={{
              color: '#f56a00',
              backgroundColor: '#fde3cf',
            }}
          >
            {user.name && user.name.split('')[0]}
          </Avatar>
        ) : (
          <Avatar src={user.photoUrl} />
        )}
        <div className="header__menu">
          <label htmlFor="option">
            <span></span>
            <span></span>
            <span></span>
          </label>
          <input type="checkbox" id="option" hidden />
          <div className="header__menu__popup">
            <div className="menu__popup__item">
              <InfoCircleOutlined />
              <span>Thông tin cá nhân</span>
            </div>
            <div className="menu__popup__item" onClick={showConfirm}>
              <LogoutOutlined />
              <span>Đăng xuất</span>
            </div>
          </div>
        </div>
      </div>
    </Head>
  )
}
export default Header
