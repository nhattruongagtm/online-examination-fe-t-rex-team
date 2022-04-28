import { Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { Subject } from '../../../models/subject'
import { InputForm, LoginResponse } from '../../../pages/Login/Login'

type Props = {}

const History = (props: Props) => {
  const [subjects, setSubjects] = useState<Subject[]>([])

  useEffect(() => {
    const data: Subject[] = [
      {
        code: 26524,
        name: 'Lâp trình nâng cao',
        examDate: 13215466,
        examTime: 15,
        id: 1,
        grade: 8,
      },
      {
        code: 26345,
        name: 'Thiết kế hướng đối tượng',
        examDate: 13215466,
        examTime: 60,
        id: 2,
        grade: 7,
      },
      {
        code: 23632,
        name: 'Chuyên đề Web',
        examDate: 13215466,
        examTime: 45,
        id: 3,
        grade: 8.5,
      },
    ]
    setSubjects(data)
  }, [])

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
      title: 'Exam date',
      dataIndex: 'examDate',
      key: 'examDate',
      render: (date: any) => <>10/4/2022</>,
    },
    {
      title: 'Time',
      key: 'examTime',
      dataIndex: 'examTime',
      render: (tags: number) => <>{tags} phút</>,
    },
    {
      title: 'Result',
      key: 'grade',
      render: (text: string, record: Subject) => <>{record.grade}</>,
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
