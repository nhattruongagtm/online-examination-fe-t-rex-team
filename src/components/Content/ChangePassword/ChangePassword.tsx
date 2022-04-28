import { Form } from 'antd'
import React from 'react'

type Props = {}

const ChangePassword = (props: Props) => {
  return (
    <div className="mainDiv">
      <div className="cardStyle">
        <form action="" method="post" name="signupForm" id="signupForm">
          {/* <img
            src="https://i.imgur.com/m2i2zsI.png"
            id="signupLogo"
          /> */}

          <h2 className="formTitle">Change password</h2>

          <div className="inputDiv">
            <label className="inputLabel" htmlFor="password">
              Current password
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
              New password
            </label>
            <input type="password" id="password" name="password" required />
          </div>

          <div className="inputDiv">
            <label className="inputLabel" htmlFor="confirmPassword">
              Confirm password
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
              <span>Reset password</span>
              {/* <span id="loader"></span> */}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
