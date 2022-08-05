import { Button, Input, Modal, Space } from 'antd'
import Table from 'antd/lib/table/Table'
// import AddClass from './AddClass'
import qs from 'query-string'
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { fetchStudent } from '../../../api/student'
import { Class } from '../../../models/class'
import { User } from '../../../models/user'
import { LoginResponse } from '../../../pages/Login/Login'
import { loadStudentList } from '../../../slice/studentSlice'
import { RootState } from '../../../store'
import AddStudent from './AddStudent'

const { Search } = Input
type Props = {}

export interface IClass {
  classes: {
    u: {
      id?: number
      fullName?: string
      email?: string
    }
  }
}
const StudentList = (props: Props) => {
  const [students, setStudents] = useState<Class[]>([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const studentList = useSelector(
    (state: RootState) => state.studentList.student
  )
  const param = useLocation()
  const [visible, setVisible] = useState(false)
  const [search, setSearch] = useState('')

  const id = Number(qs.parse(param.search).classID)
  const className = qs.parse(param.search).className
  const user = JSON.parse(
    localStorage.getItem('e-exam') as string
  ) as LoginResponse

  const ref = useRef<User[]>([])

  useEffect(() => {
    fetchStudent.fetchDataStudent(id).then(
      (response) => {
        console.log(response)
        ref.current = response
        dispatch(loadStudentList(response))
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  const columnss = [
    {
      title: 'Student ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Full Name',
      dataIndex: 'className',
      key: 'className',
    },
    {
      title: 'Email',
      dataIndex: 'u.email',
      key: 'u',
    },
  ]
  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'id',
      key: 'id',
      // render: (users: TestStudent[]) => <div>{users.map((item,index) => <div key={`item-${index}`}>{item.id}</div>)}</div>,
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      // render: (users: TestStudent[]) => <div>{users.map((item,index) => <div key={`item-${index}`}>{item.fullName}</div>)}</div>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      // render: (users: TestStudent[]) => <div>{users.map((item,index) => <div key={`item-${index}`}>{item.email}</div>)}</div>,
    },
  ]

  useEffect(() => {
    let list: User[] = []

    if (search) {
      list = ref.current.filter(
        (item) =>
          item.fullName.toLowerCase().indexOf(search) !== -1 ||
          item.id.toString().indexOf(search) !== -1
      )
    } else {
      list = ref.current
    }
    dispatch(loadStudentList(list))
  }, [search])

  return (
    <>
      <Space
        style={{ width: '100%', display: 'flex', justifyContent: 'right' }}
      >
        <Button
          style={{ float: 'right', margin: '0 4.5rem 1.5rem 0' }}
          onClick={() => setVisible(true)}
        >
          Add Student
        </Button>
        <Modal
          okButtonProps={{ style: { display: 'none' } }}
          title="Add Student"
          centered
          visible={visible}
          onCancel={() => setVisible(false)}
          width={700}
        >
          <AddStudent
            classID={id}
            classesName={className as string}
          ></AddStudent>
        </Modal>
      </Space>
      <Space direction="horizontal">
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      </Space>
      <Table
        columns={user && user.type === 0 ? columnss : columns}
        dataSource={studentList}
        pagination={{ defaultPageSize: 6 }}
      />
    </>
  )
}

export default StudentList
