import { Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { Subject } from '../../../models/subject'
import { InputForm, LoginResponse } from '../../../pages/Login/Login'
import { examApi } from '../../../api/history'
import { Result } from '../../../models/exam'
type Props = {}

const History = (props: Props) => {
  const [subjects, setSubjects] = useState<Result[]>([])

  const u = localStorage.getItem('e-exam')
    ? (JSON.parse(localStorage.getItem('e-exam') as string) as LoginResponse)
    : null

  useEffect(() => {
    if (u) {
      examApi
        .getHistory(1)
        .then((res) => {
          console.log(res)
          setSubjects(res)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [])

  const columns = [
    {
      title: 'Subject ID',
      dataIndex: 'code',
      key: 'code',
      render: (text: string, rs: Result) => <p>{rs && rs.subject.code}</p>,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (text: string, rs: Result) => <p>{rs && rs.subject.name}</p>,
    },
    {
      title: 'Exam date',
      dataIndex: 'examDate',
      key: 'examDate',
      render: (text: string, rs: Result) => <p>{rs && rs.subject.examDate}</p>,
    },
    {
      title: 'Time',
      key: 'duration',
      dataIndex: 'duration',
      render: (tags: number) => <>{tags} phút</>,
    },
    {
      title: 'Result',
      key: 'grade',
      render: (text: string, record: Result) => (
        <>
          {record.correct}/{record.total}
        </>
      ),
    },
  ]

  const storage = localStorage.getItem('e-exam')
  let user: LoginResponse = storage ? JSON.parse(storage as string) : null

  if (user && user.type !== 0) {
    return <>bạn không có quyền</>
  }
  return <Table columns={columns} dataSource={subjects} />
}

export default History
