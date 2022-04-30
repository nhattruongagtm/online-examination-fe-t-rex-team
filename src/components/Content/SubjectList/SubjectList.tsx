import { Button, Modal } from 'antd'
import Table from 'antd/lib/table/Table'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { fetchSubject } from '../../../api/demoApi'
import { Subject } from '../../../models/subject'
import { InputForm, LoginResponse } from '../../../pages/Login/Login'
import { IRoute } from '../router'
import AddSubject from './AddSubject'

type Props = {}

const SubjectList = (props: Props) => {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const navigate = useNavigate()

  const [visible, setVisible] = useState(false)

  const user = JSON.parse(
    localStorage.getItem('e-exam') as string
  ) as LoginResponse

  useEffect(() => {
    fetchSubject.fetchData(1).then(
      (response) => {
        console.log(response)
        setSubjects(response)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  const columnss = [
    {
      title: 'Subject ID',
      dataIndex: 'code',
      key: 'code',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Subject',
      dataIndex: 'name',
      key: 'name',
    },
    // {
    //   title: 'Exam date',
    //   dataIndex: 'examDate',
    //   key: 'examDate',
    //   render: (date: any) => <>{date}</>,
    // },
    // {
    //   title: 'Time',
    //   key: 'examTime',
    //   dataIndex: 'examTime',
    //   render: (time: any) => <>{time} minutes</>,
    // },
  ]

  const columns = [
    {
      title: 'Subject ID',
      dataIndex: 'code',
      key: 'code',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Subject',
      dataIndex: 'name',
      key: 'name',
    },
    // {
    //   title: 'Exam date',
    //   dataIndex: 'examDate',
    //   key: 'examDate',
    //   render: (date: any) => <>{date}</>,
    // },
    // {
    //   title: 'Time',
    //   key: 'examTime',
    //   dataIndex: 'examTime',
    //   render: (time: any) => <>{time} minutes</>,
    // },
    {
      title: '',
      key: 'list',
      render: (text: string, record: any) => (
        <Button
          onClick={() => navigate(`${IRoute.CLASS_LIST}?ma-mon-hoc=${123}`)}
        >
          List of Class
        </Button>
      ),
    },
    {
      title: '',
      key: 'create',
      render: (text: string, record: any) => (
        <Button
          onClick={() => navigate(`${IRoute.CREATE_EXAM}?ma-mon-hoc=${123}`)}
        >
          View exam questions
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
        Add Subject
      </Button>
      <Modal
        okButtonProps={{ style: { display: 'none' } }}
        title="Add Subject"
        centered
        visible={visible}
        // onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={700}
      >
        <AddSubject></AddSubject>
      </Modal>
      <Table
        columns={user && user.type === 0 ? columnss : columns}
        dataSource={subjects}
      />
    </>
  )
}

export default SubjectList
