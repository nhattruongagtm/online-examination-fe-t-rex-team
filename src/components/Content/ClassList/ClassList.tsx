import { Button, Modal } from 'antd'
import Table from 'antd/lib/table/Table'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { fetchClass, fetchSubject } from '../../../api/demoApi'
import { Class } from '../../../models/class'
import { Subject } from '../../../models/subject'
import { InputForm, LoginResponse } from '../../../pages/Login/Login'
import { IRoute } from '../router'
import AddSubject from '../SubjectList/AddSubject'

type Props = {}

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
        setClasses(response)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  const columnss = [
    {
      title: 'Class ID',
      dataIndex: 'code',
      key: 'code',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Class',
      dataIndex: 'name',
      key: 'name',
    },
  ]

  const columns = [
    {
      title: 'Class ID',
      dataIndex: 'code',
      key: 'code',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Class',
      dataIndex: 'name',
      key: 'name',
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
        <AddSubject></AddSubject>
      </Modal>
      <Table
        columns={user && user.type === 0 ? columnss : columns}
        dataSource={classes}
      />
    </>
  )
}

export default ClassList
