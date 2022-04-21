import { createFromIconfontCN } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import Password from 'antd/lib/input/Password'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IRoute } from '../../components/Content/router'
interface Props {}

export interface InputForm {
  username: string
  password: string
  type: 0 | 1
  remember: boolean
}

const Login = (props: Props) => {
  const [inputForm, setInputForm] = useState({
    username: '',
    password: '',
    type: 0,
    remember: false,
  })
  const navigate = useNavigate()
  const onFinish = () => {
    if (inputForm.username === 'sinhvien1' && inputForm.password === '123') {
      localStorage.setItem('e-exam', JSON.stringify({ ...inputForm, type: 0 }))
      navigate(IRoute.SUBJECT_LIST)
    } else if (inputForm.username === 'gv1' && inputForm.password === '123') {
      localStorage.setItem('e-exam', JSON.stringify({ ...inputForm, type: 1 }))
      navigate(IRoute.SUBJECT_LIST)
    } else {
      alert('Tên tài khoản hoặc mật khẩu không chính xác!')
    }
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
            <a className="forget">Forget password</a>
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
