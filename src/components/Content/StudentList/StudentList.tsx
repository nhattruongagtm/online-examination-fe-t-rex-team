import { Button, Modal } from 'antd'
import Table from 'antd/lib/table/Table'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { fetchClass, fetchSubject } from '../../../api/demoApi'
import { Class,TestStudent } from '../../../models/class'
import { Subject } from '../../../models/subject'
import { InputForm, LoginResponse } from '../../../pages/Login/Login'
import { IRoute } from '../router'
import AddSubject from '../SubjectList/AddSubject'
import AddStudent from './AddStudent'
// import AddClass from './AddClass'
import qs from 'query-string'
import { fetchStudent } from '../../../api/student'

type Props = {}

export interface IClass{
  classes: {
    u: {
      id?: number;
      fullName?: string;
      email?:  string;
    }
  }
}
const StudentList = (props: Props) => {
  const [students, setStudents] = useState<Class[]>([])
  const navigate = useNavigate()
  const param = useLocation()
  const [visible, setVisible] = useState(false)
  const id = Number(qs.parse(param.search).classID)
  const user = JSON.parse(
    localStorage.getItem('e-exam') as string
  ) as LoginResponse

  useEffect(() => {
    fetchStudent.fetchDataStudent(id).then(
      (response) => {
        console.log(response)
        setStudents(response);
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
    },{
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

  return (
    <>
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
        <AddStudent></AddStudent>
      </Modal>
      <Table
        columns={user && user.type === 0 ? columnss : columns}
        dataSource={students}
      />
    </>
  )
}

export default StudentList
