import { Button } from 'antd'
import Table from 'antd/lib/table/Table'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { examApi } from '../../../api/examApi'
import useUser from '../../../hook/useUser'
import { Subject } from '../../../models/subject'
import { loadSubjectList } from '../../../slice/subjectSlice'
import { RootState } from '../../../store'
import { checkExamDate, excludeDate } from '../../../utils/checkExamDate'
import { IRoute } from '../router'

type Props = {}

const SubjectForStudent = (props: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const subjectList = useSelector(
    (state: RootState) => state.subjects.subjectList
  )
  const [u] = useUser()

  useEffect(() => {
    u &&
      examApi
        .loadExamByStudent(u.id)
        .then((res) => {
          console.log(res)
          dispatch(loadSubjectList(res))
        })
        .catch((e) => {
          console.log(e)
        })
  }, [])

  const columns = [
    {
      title: 'Subject Code',
      dataIndex: 'code',
      key: 'code',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Subject Name',
      dataIndex: 'subjectName',
      key: 'subjectName',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'tume',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: '',
      dataIndex: 'test',
      key: 'test',
      render: (text: string, subject: Subject) => (
        <>
          <Button
            disabled={
              subject.date && subject.duration && subject.time
                ? !checkExamDate(subject.date, subject.time, subject.duration)
                : true
            }
            onClick={() =>
              navigate(
                `${IRoute.TEST}?code=${subject.id}/${excludeDate(
                  subject.date as string
                )}`
              )
            }
          >
            Go To Test
          </Button>
        </>
      ),
    },
  ]

  return <Table columns={columns} dataSource={subjectList} />
}

export default SubjectForStudent
