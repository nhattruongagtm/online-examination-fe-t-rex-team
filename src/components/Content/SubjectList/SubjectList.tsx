import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import Table from 'antd/lib/table/Table'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { fetchSubject } from '../../../api/demoApi'
import { subjectApi } from '../../../api/subject'
import { Class } from '../../../models/class'
import { Subject } from '../../../models/subject'
import { InputForm, LoginResponse } from '../../../pages/Login/Login'
import { deleteSubject, loadSubjectList } from '../../../slice/subjectSlice'
import { RootState } from '../../../store'
import { IRoute } from '../router'
import AddSubject from './AddSubject'
import useUser from '../../../hook/useUser'
import { examApi } from '../../../api/examApi'
import SubjectForStudent from './SubjectForStudent'
import SubjectForTeacher from './SubjectForTeacher'

type Props = {}

const SubjectList = (props: Props) => {
  const [u] = useUser()

  return <>{u?.type === 0 ? <SubjectForStudent /> : <SubjectForTeacher />}</>
}

export default SubjectList
