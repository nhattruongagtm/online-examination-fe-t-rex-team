import { Button, Checkbox, Form, Input } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userApi } from '../../api/userApi'
import { IRoute } from '../../components/Content/router'
import Util from '../../pages/Util/Util'
import useUser from '../../hook/useUser'
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
}

const Login = (props: Props) => {
  const [u] = useUser()
  const [inputForm, setInputForm] = useState({
    username: '',
    password: '',
  })
  const navigate = useNavigate()
  const onFinish = () => {
    
    userApi
      .login(inputForm.username, inputForm.password)
      .then((res) => {
        if (res.access_token) {
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
  if (u) {
    return <Util />
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
            remember: false,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="login__title title">Log in</div>
          <Form.Item
            label="Username"
            name="username"
            className="label_user"
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

          <div className="forgotandremen">
            <Form.Item
              className="rememberme"
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
                Forgot password
              </a>
            </Form.Item>
          </div>

          <Form.Item
            className="buttonsm"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" color="#678433">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
