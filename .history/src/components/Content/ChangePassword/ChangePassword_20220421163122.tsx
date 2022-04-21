import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Swal from 'sweetalert2'

type Props = {}

const ChangePassword = (props: Props) => {
  const formSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .required('Vui lòng nhập mật khẩu cũ')
      .min(3, 'Mật khẩu tối thiểu 3 ký tự'),
    password: Yup.string()
      .required('Vui lòng nhập mật khẩu mới')
      .min(3, 'Mật khẩu tối thiểu 3 ký tự'),
    confirmPwd: Yup.string()
      .required('Vui lòng nhập mật khẩu mới')
      .oneOf([Yup.ref('password')], 'Mật khẩu mới không khớp'),
  })
  const formOptions = { resolver: yupResolver(formSchema) }
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState
  function onSubmit(data: any) {
    console.log(JSON.stringify(data, null, 4))
    Swal.fire({
      icon: 'success',
      text: 'Đổi mật khẩu thành công',
    })
    return false
  }
  return (
    <div className="mainDiv">
      <div className="cardStyle">
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          method="post"
          name="signUpForm"
          id="signUpForm"
        >
          <h2 className="formTitle">Đổi mật khẩu</h2>
          <div className="inputDiv">
            <label className="inputLabel" htmlFor="oldPassword">
              Mật khẩu cũ
            </label>
            <input
              type="password"
              {...register('oldPassword')}
              className={`form-control ${
                errors.oldPassword ? 'is-invalid' : ''
              }`}
            />
            <div className="invalid-feedback">
              {errors.oldPassword?.message}
            </div>
          </div>

          <div className="inputDiv">
            <label className="inputLabel" htmlFor="password">
              Mật khẩu mới
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
              Nhập lại mật khẩu mới
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
              <span>Tiếp tục</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
