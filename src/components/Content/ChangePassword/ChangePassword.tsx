import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import axios from 'axios'
import { userApi } from '../../../api/userApi'
import { LoginResponse } from '../../../pages/Login/Login'

type Props = {}

interface InputForm {
  password: string
  confirmPwd: string
}

const ChangePassword = (props: Props) => {
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required('Vui lòng nhập mật khẩu mới')
      .min(3, 'Mật khẩu tối thiểu 3 ký tự'),
    confirmPwd: Yup.string()
      .required('Vui lòng nhập mật khẩu mới')
      .oneOf([Yup.ref('password')], 'Mật khẩu mới không khớp'),
  })
  const formOptions = { resolver: yupResolver(formSchema) }
  const { register, handleSubmit, reset, formState } =
    useForm<InputForm>(formOptions)
  const { errors } = formState
  function onSubmit(data: InputForm) {
    Swal.fire({
      icon: 'success',
      text: 'Đổi mật khẩu thành công',
    })

    const u = JSON.parse(
      localStorage.getItem('e-exam') as string
    ) as LoginResponse
    console.log(u.id)
    userApi
      .changePassword(u.id, data.password)
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  return (
    <div className="mainDiv">
      <div className="cardStyle">
        <form
          action="@{user}"
          onSubmit={handleSubmit(onSubmit)}
          method="put"
          name="signUpForm"
          id="signUpForm"
        >
          <img src="https://i.imgur.com/m2i2zsI.png" id="signupLogo" />
          <h2 className="formTitle">Change password</h2>
          <div className="inputDiv">
            <label className="inputLabel" htmlFor="password">
              New password
            </label>
            <input
              type="password"
              {...register('password')}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

          <div className="inputDiv">
            <label className="inputLabel" htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
              type="password"
              {...register('confirmPwd')}
              className={`form-control ${
                errors.confirmPwd ? 'is-invalid' : ''
              }`}
            />
            <div className="invalid-feedback">{errors.confirmPwd?.message}</div>
          </div>
          <div className="buttonWrapper">
            <button
              type="submit"
              id="submitButton"
              className="submitButton pure-button pure-button-primary"
            >
              <span>Reset password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
