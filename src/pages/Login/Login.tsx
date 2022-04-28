import { createFromIconfontCN } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import Password from 'antd/lib/input/Password'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { userApi } from '../../api/userApi'
import { IRoute } from '../../components/Content/router'
interface Props {}

export interface LoginResponse {
  id: number
  name: string
  photoUrl: string
  type: number
}
export interface InputForm {
  username: string
  password: string
  remember: boolean
}

const Login = (props: Props) => {
  const [inputForm, setInputForm] = useState({
    username: '',
    password: '',
    remember: false,
  })
  const navigate = useNavigate()
  const onFinish = () => {
    userApi
      .login(inputForm.username, inputForm.password)
      .then((res) => {
        if (res.id) {
          localStorage.setItem('e-exam', JSON.stringify(res))
          navigate(IRoute.SUBJECT_LIST)
        } else {
          alert('Tên tài khoản hoặc mật khẩu không chính xác!')
        }
      })
      .catch((e) => {
        alert('Đã xảy ra lỗi! Vui lòng thử lại!')
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="login__page">
      <div className="login__form">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="login__title title">Đăng nhập</div>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input
              value={inputForm.username}
              onChange={(e) =>
                setInputForm({ ...inputForm, username: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password
              value={inputForm.password}
              onChange={(e) =>
                setInputForm({ ...inputForm, password: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <a onClick={() => navigate(IRoute.FORGOT_PASSWORD)}>
              Forget password
            </a>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
