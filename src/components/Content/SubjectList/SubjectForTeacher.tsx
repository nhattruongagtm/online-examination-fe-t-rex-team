import { DeleteOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import Table from 'antd/lib/table/Table'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { fetchSubject } from '../../../api/demoApi'
import { examApi } from '../../../api/examApi'
import { subjectApi } from '../../../api/subject'
import useUser from '../../../hook/useUser'
import { Subject } from '../../../models/subject'
import { editExam } from '../../../slice/examSlice'
import { deleteSubject, loadSubjectList } from '../../../slice/subjectSlice'
import { RootState } from '../../../store'
import { IRoute } from '../router'
import AddSubject from './AddSubject'

type Props = {}

const SubjectForTeacher = (props: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const subjectList = useSelector(
    (state: RootState) => state.subjects.subjectList
  )
  const [u] = useUser()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    u &&
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

  const handleEditExam = async (id: number) => {
    try {
      const resp = await examApi.loadExamBySubject(id)
      if (resp) {
        console.log(resp)
        dispatch(editExam(resp))
        navigate(`${IRoute.CREATE_EXAM}`)
      } else {
        console.log('cannot get this exam')
      }
    } catch (error) {
      console.log(error)
    }
  }

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
      render: (text: string, record: Subject) => (
        <Button onClick={() => handleEditExam(record.id)}>Edit</Button>
      ),
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
        <AddSubject />
      </Modal>
      <Table
        columns={columns}
        dataSource={subjectList}
        pagination={{ defaultPageSize: 6 }}
      />
    </>
  )
}

export default SubjectForTeacher
