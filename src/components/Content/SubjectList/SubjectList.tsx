import { DeleteOutlined } from '@ant-design/icons'
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

type Props = {}

const SubjectList = (props: Props) => {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const subjectList = useSelector(
    (state: RootState) => state.subjects.subjectList
  )
  const u = useUser()
  const [visible, setVisible] = useState(false)

  const user = JSON.parse(
    localStorage.getItem('e-exam') as string
  ) as LoginResponse

  useEffect(() => {
    fetchSubject.fetchData(1).then(
      (response) => {
        console.log(response)
        dispatch(loadSubjectList(response))
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  const handleDeleteSubject = (id: number) => {
    dispatch(deleteSubject(id))

    subjectApi
      .deleteSubject(id)
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        console.log(e)
      })
  }

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
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      render: (text: string, record: Subject) => (
        <Button
          onClick={() =>
            navigate(`${IRoute.CLASS_LIST}?subjectID=${record.id}`)
          }
        >
          List of Class
        </Button>
      ),
    },
    {
      title: '',
      key: 'create',
      render: (text: string, record: Subject) => (
        <Button
          onClick={() =>
            navigate(`${IRoute.CREATE_EXAM}?subjectID=${record.id}`)
          }
        >
          View exam questions
        </Button>
      ),
    },

    {
      title: '',
      key: 'create',
      render: (text: string, record: any) => <Button>Edit</Button>,
    },

    {
      title: '',
      dataIndex: 'id',
      key: 'create',
      render: (text: string, record: Subject) => (
        <Button danger onClick={() => handleDeleteSubject(record.id)}>
          <DeleteOutlined className="subject" />
        </Button>
      ),
    },
  ]

  return (
    <>
      {user.type === 1 && (
        <Button
          style={{ float: 'right', margin: '0 4.5rem 1.5rem 0' }}
          onClick={() => setVisible(true)}
        >
          Add Subject
        </Button>
      )}
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
        dataSource={subjectList}
      />
    </>
  )
}

export default SubjectList
