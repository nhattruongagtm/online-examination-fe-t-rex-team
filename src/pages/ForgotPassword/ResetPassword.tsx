import React from 'react'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router'
import { IRoute } from '../../components/Content/router'

type Props = {}

const ResetPassword = (props: Props) => {
  const navigate = useNavigate()
  const onFinish = (values: any) => {
    localStorage.setItem('e-exam', JSON.stringify(123))
    navigate(IRoute.SUBJECT_LIST)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="forgotPw__page">
      <div className="forgotPw__form">
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
          <div className="login__title title">Đổi mật khẩu</div>
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
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm"
            name="repassword"
            rules={[
              {
                required: true,
                message: 'Please input your confirm!',
              },
            ]}
          >
            <Input.Password />
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

export default ResetPassword
