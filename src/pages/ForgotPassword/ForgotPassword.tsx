import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router'
import { IRoute } from '../../components/Content/router'

type Props = {}

const ForgotPassword = (props: Props) => {
  const [email, setEmail] = useState('')

  const navigate = useNavigate()
  const onFinish = (values: any) => {
    // localStorage.setItem('e-exam', JSON.stringify(123))
    // navigate(IRoute.SUBJECT_LIST)
    alert('Gửi thành công, vui lòng kiểm tra email')
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const handleSubmit = () => {
    console.log(email)
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
          <div className="login__title title">Quên mật khẩu</div>
          <Form.Item
            label="Email"
            name="Email"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button onClick={handleSubmit} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default ForgotPassword
