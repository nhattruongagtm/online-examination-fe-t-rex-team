import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { IRoute } from '../../components/Content/router'
import { userApi } from '../../api/userApi'
import { useNavigate, useParams } from 'react-router'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { loadMessage } from '../../slice/responseSlice'

type Props = {}

const ForgotPassword = (props: Props) => {
  const [email, setEmail] = useState('')
  const { userEmail } = useParams()
  const [message, setMessage] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = (values: any) => {
    alert('Gửi thành công, vui lòng kiểm tra email')
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const handleSubmit = () => {
    console.log(email)
    if (email === null) {
      setMessage('Vui lòng điền email của bạn')
    } else {
      userApi
        .sendEmail(email)
        .then((res) => {
          console.log(res)
          dispatch(loadMessage(res))
          setMessage(res.message)
          console.log(res.message)
          // navigate(IRoute.EMAIL_SENT)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  return (
    <div className="forgotPw__page">
      <div className="forgotPw__form">
        <div className="forgotPw__title title">Forgot Password</div>
        <div className="title-message">{message}</div>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            email: userEmail,
            redirectUrl: 'http://localhost:3000/passwordReset',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="Email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input
              placeholder="oval@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              className="btnsm"
              onClick={handleSubmit}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
            <Button
              className="link-login"
              onClick={() => navigate(IRoute.HOME)}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
        {/* </Formik> */}
      </div>
    </div>
  )
}

export default ForgotPassword
