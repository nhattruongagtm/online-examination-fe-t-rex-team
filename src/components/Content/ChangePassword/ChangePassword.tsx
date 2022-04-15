import { Form } from 'antd'
import React from 'react'

type Props = {}

const ChangePassword = (props: Props) => {
  return (
    <div className="mainDiv">
      <div className="cardStyle">
        <form action="" method="post" name="signupForm" id="signupForm">
          <img
            src="https://s3-us-west-2.amazonaws.com/shipsy-public-assets/shipsy/SHIPSY_LOGO_BIRD_BLUE.png"
            id="signupLogo"
          />

          <h2 className="formTitle">Đổi mật khẩu</h2>

          <div className="inputDiv">
            <label className="inputLabel" htmlFor="password">
              Mật khẩu cũ
            </label>

            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              required
            />
          </div>

          <div className="inputDiv">
            <label className="inputLabel" htmlFor="password">
              Mật khẩu mới
            </label>
            <input type="password" id="password" name="password" required />
          </div>

          <div className="inputDiv">
            <label className="inputLabel" htmlFor="confirmPassword">
              Nhập lại mật khẩu mới
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
            />
          </div>

          <div className="buttonWrapper">
            <button
              type="submit"
              id="submitButton"
              className="submitButton pure-button pure-button-primary"
            >
              <span>Tiếp tục</span>
              {/* <span id="loader"></span> */}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
