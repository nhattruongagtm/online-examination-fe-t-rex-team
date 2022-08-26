import { Breadcrumb, Layout, Menu } from 'antd'
import 'antd/dist/antd.css'
import 'boxicons'
import React from 'react'
import ContentPanel from '../../components/Content/ContentPanel'
import Header from '../../components/Header/Header'
import SideBar from '../../components/SideBar/SideBar'
import useUser from '../../hook/useUser'
import Login from '../../pages/Login/Login'
const { Content } = Layout

type Props = {}

const Util = (props: Props) => {
  const [u] = useUser()
  console.log(u)
  if (!u) {
    return <Login />
  }
  return (
    <Layout>
      <Header />
      <Layout>
        <SideBar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <ContentPanel />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Util
