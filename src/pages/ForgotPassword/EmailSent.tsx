import { Button } from 'antd'
import { useNavigate, useParams } from 'react-router'
import { IRoute } from '../../components/Content/router'

type Props = {}

export const EmailSent = (props: Props) => {
  // const history = useHistory();
  const { userEmail, reset } = useParams()
  const navigate = useNavigate()

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'transparent',
          width: '100%',
          padding: '15px',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      ></div>
      {reset && userEmail && (
        <div style={{ backgroundColor: 'revert' }}>
          <h2>Password Reset</h2>
          <span>
            An email with a password rest link has been sent to your email:
            <b style={{ color: 'blue' }}>{userEmail}</b>
          </span>
          <span>Check your email and click on the link to proceed!</span>
        </div>
      )}

      {!reset && userEmail && (
        <div style={{ backgroundColor: 'revert' }}>
          <h2>Account Confirmation</h2>
          <span>
            An email with your account confirmation link has been sent to your
            email:
            <b style={{ color: 'blue' }}>{userEmail}</b>
          </span>
          <span>Check your email and come back to proceed!</span>
          <button onClick={() => navigate(`https://mail.google.com/`)}>
            Proceed
          </button>
        </div>
      )}

      {!reset && !userEmail && (
        <div style={{ backgroundColor: 'revert' }}>
          <h2>Account Confirmation</h2>
          <span>
            Your password has been reset successfully
            {/* <b style={{ color: 'blue' }}>{userEmail}</b> */}
          </span>
          <span>You may now login</span>
          <button onClick={() => navigate(IRoute.HOME)}>Proceed</button>
        </div>
      )}
    </div>
  )
}
