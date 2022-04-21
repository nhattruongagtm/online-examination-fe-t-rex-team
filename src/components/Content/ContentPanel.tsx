import React from 'react'
import { Route, Routes } from 'react-router'
import ChangePassword from './ChangePassword/ChangePassword'
import History from './History/History'
import { IRoute } from './router'
import SubjectList from './SubjectList/SubjectList'

type Props = {}

const ContentPanel = (props: Props) => {
  return (
    <div>
      <Routes>
        <Route path={IRoute.SUBJECT_LIST} element={<SubjectList />} />
        <Route path={IRoute.HISTORY} element={<History />} />
        <Route path={IRoute.CHANGE_PASSWORD} element={<ChangePassword />} />
      </Routes>
    </div>
  )
}

export default ContentPanel
