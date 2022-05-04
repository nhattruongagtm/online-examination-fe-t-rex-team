import { Button, Modal } from 'antd'
import Table from 'antd/lib/table/Table'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { fetchClass } from '../../../api/demoApi'
import { Class,TestStudent } from '../../../models/class'
import { InputForm, LoginResponse } from '../../../pages/Login/Login'
import { IRoute } from '../router'
import AddClass from './AddClass'

type Props = {}

export interface IClass{
  classes: {
    classID: number
    className: string
    u: TestStudent[]
  }
}
const ClassList = (props: Props) => {
  const [classes, setClasses] = useState<Class[]>([])
  const navigate = useNavigate()

  const [visible, setVisible] = useState(false)

  const user = JSON.parse(
    localStorage.getItem('e-exam') as string
  ) as LoginResponse

  useEffect(() => {
    fetchClass.fetchData(1).then(
      (response) => {
        console.log(response)
        setClasses(response);
        
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  const columnss = [
    {
      title: 'Class ID',
      dataIndex: 'classID',
      key: 'classID',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Class',
      dataIndex: 'className',
      key: 'className',
    },{
      title: 'List Student',
      dataIndex: 'u',
      key: 'u',
    },
  ]
  const columns = [
    {
      title: 'Class ID',
      dataIndex: 'classID',
      key: 'classID',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Class',
      dataIndex: 'className',
      key: 'className',
    },
    {
      title: 'List Student',
      dataIndex: 'u',
      key: 'u',
      render: (users: any) => <div>{console.log("in render:", users) 
      }here</div>,
    },
    {
      title: '',
      key: 'list',
      render: (text: string, record: any) => (
        <Button
          onClick={() => navigate(`${IRoute.STUDENT_LIST}?ma-mon-hoc=${123}`)}
        >
          List of Student
        </Button>
      ),
    },
  ]

  return (
    <>
      <Button
        style={{ float: 'right', margin: '0 4.5rem 1.5rem 0' }}
        onClick={() => setVisible(true)}
      >
        Add class
      </Button>
      <Modal
        okButtonProps={{ style: { display: 'none' } }}
        title="Add class"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        width={700}
      >
        <AddClass></AddClass>
      </Modal>
      <Table
        columns={user && user.type === 0 ? columnss : columns}
        dataSource={classes}
      />
    </>
  )
}

export default ClassList
