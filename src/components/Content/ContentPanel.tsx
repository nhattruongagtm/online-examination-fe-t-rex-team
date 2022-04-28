import React from 'react'
import { Route, Routes } from 'react-router'
import ChangePassword from './ChangePassword/ChangePassword'
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword'
import ResetPassword from '../../pages/ForgotPassword/ResetPassword'
import History from './History/History'
import { IRoute } from './router'
import StudentList from './StudentList/StudentList'
import SubjectList from './SubjectList/SubjectList'
import { EmailSent } from '../../pages/ForgotPassword/EmailSent'
import AddSubject from './SubjectList/AddSubject'

type Props = {}

const ContentPanel = (props: Props) => {
  return (
    <div>
      <Routes>
        <Route path={IRoute.SUBJECT_LIST} element={<SubjectList />} />
        <Route path={IRoute.HISTORY} element={<History />} />
        <Route path={IRoute.CHANGE_PASSWORD} element={<ChangePassword />} />
        <Route path={IRoute.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={IRoute.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={IRoute.EMAIL_SENT} element={<EmailSent />} />
        <Route path={IRoute.ADD_SUBJECT} element={<AddSubject />} />
        <Route path={IRoute.STUDENT_LIST} element={<StudentList />} />
      </Routes>
    </div>
  )
}

export default ContentPanel
