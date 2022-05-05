import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router'
import { IRoute } from '../../components/Content/router'
import { userApi } from '../../api/userApi'
import { useParams } from 'react-router'

type Props = {}

const ResetPassword = (props: Props) => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()
  const onFinish = (values: any) => {
    // localStorage.setItem('e-exam', JSON.stringify(123))
    // navigate(IRoute.SUBJECT_LIST)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token') || ''
  console.log(token)

  const handleSubmit = () => {
    userApi
      .resetPassword(token, confirmNewPassword)
      .then((res) => {
        console.log(res)
        setMessage(res.message)
      })
      .catch((e) => {
        console.log(e)
      })
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="forgotPw__title title">Reset Password</div>
          <div className='title-message success'>{message}</div>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: 'Please input new password',
              },
            ]}
          >
            <Input.Password
              placeholder="********"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmNewPassword"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input confirm new passwordl!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  )
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="********"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
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
            <a className="link-login" onClick={() => navigate(IRoute.HOME)}>
              Login
            </a>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default ResetPassword
