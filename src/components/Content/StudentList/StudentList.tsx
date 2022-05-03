import { Button, Modal, Table } from 'antd'
import React, { useState } from 'react'
import { Subject } from 'react-hook-form/dist/utils/createSubject'
import { useNavigate, useParams } from 'react-router'
import { LoginResponse } from '../../../pages/Login/Login'
import AddSubject from '../SubjectList/AddSubject'

type Props = {}

const StudentList = (props: Props) => {
  // const [subjects, setSubjects] = useState<Subject[]>([])
  const navigate = useNavigate()

  const [visible, setVisible] = useState(false)

  const user = JSON.parse(
    localStorage.getItem('e-exam') as string
  ) as LoginResponse
  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
      render: (date: any) => <>DH18DTC</>,
    },
    {
      title: 'Date of birth',
      dataIndex: 'dob',
      key: 'dob',
      render: (date: any) => <>11/5/2000</>,
    },
  ]

  const data = [
    {
      key: '1',
      id: '54654651',
      name: 'Trương Nguyễn Thiên Ân',
    },
    {
      key: '2',
      id: '54656764',
      name: 'Lê Diễm My',
    },
    {
      key: '3',
      id: '14646516',
      name: 'Nguyễn Văn Cương',
    },
  ]
  return (
    <>
      <Button
        style={{ float: 'right', margin: '0 4.5rem 1.5rem 0' }}
        onClick={() => setVisible(true)}
      >
        Thêm sinh viên
      </Button>
      <Modal
        okButtonProps={{ style: { display: 'none' } }}
        title="Thêm sinh viên"
        centered
        visible={visible}
        // onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={700}
      >
        <AddSubject></AddSubject>
      </Modal>
      <Table columns={columns} dataSource={data} />)
    </>
  )
}

export default StudentList
