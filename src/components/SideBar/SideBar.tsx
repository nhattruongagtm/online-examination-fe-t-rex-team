import { LaptopOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { NavLink, useLinkClickHandler } from 'react-router-dom'
import { ISideBar, RouterModel } from '../../models/router'
import { InputForm, LoginResponse } from '../../pages/Login/Login'
import { IRoute } from '../Content/router'

const { SubMenu } = Menu
const { Sider } = Layout
type Props = {}

const SideBar = (props: Props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
  const studentSideBar: ISideBar[] = [
    {
      title: 'Dashboard',
      routes: [
        {
          path: IRoute.SUBJECT_LIST,
          title: 'Exams schedule',
          icon: '',
        },
        {
          path: IRoute.HISTORY,
          title: 'Results',
          icon: '',
        },
      ],
      icon: <UserOutlined />,
      key: 1,
    },
    {
      title: 'Setting',
      routes: [
        {
          path: IRoute.CHANGE_PASSWORD,
          title: 'Change password',
          icon: '',
        },
      ],
      icon: <LaptopOutlined />,
      key: 2,
    },
  ]
  const teacherSideBar: ISideBar[] = [
    {
      title: 'Dashboard',
      routes: [
        {
          path: IRoute.SUBJECT_LIST,
          title: 'Subject',
          icon: '',
        },
        {
          path: IRoute.CREATE_EXAM,
          title: 'Create exam',
          icon: '',
        },
        {
          path: IRoute.VIEW_POINT_EXAM,
          title: 'View Point Exam',
          icon: '',
        },
        {
          path: IRoute.DASHBOARD,
          title: 'Dashboard',
          icon: '',
        },
      ],
      icon: <UserOutlined />,
      key: 1,
    },
    {
      title: 'Setting',
      routes: [
        {
          path: IRoute.CHANGE_PASSWORD,
          title: 'Change password',
          icon: '',
        },
        // {
        //   path: IRoute.FORGOT_PASSWORD,
        //   title: 'Quên mật khẩu',
        //   icon: '',
        // },
      ],
      icon: <LaptopOutlined />,
      key: 2,
    },
  ]
  const user: LoginResponse = localStorage.getItem('e-exam')
    ? JSON.parse(localStorage.getItem('e-exam') as string)
    : null
  let sideBar = user.type === 0 ? studentSideBar : teacherSideBar

  const pos = sideBar.filter((item) => {
    item.routes.filter((route) => route.path === path)
  })

  const handleItem = (path: string) => {
    console.log(path)
    if (path === IRoute.LOGOUT) {
      localStorage.removeItem('e-exam')
      navigate(IRoute.HOME)
    } else navigate(path)
  }

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={[path]}
        defaultOpenKeys={
          pos.length > 0 ? [pos[0].key.toString()] : [sideBar[0].key.toString()]
        }
        style={{ height: '100%', borderRight: 0 }}
      >
        {sideBar.map((item) => (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {item.routes.map((route) => (
              <Menu.Item
                key={route.path}
                onClick={() => handleItem(route.path)}
              >
                {route.title}
              </Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
    </Sider>
  )
}

export default SideBar
