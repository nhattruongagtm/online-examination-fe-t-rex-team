import Table from 'antd/lib/table/Table'
import React, { useEffect, useState } from 'react'
import { fetchSubject } from '../../../api/demoApi'

type Props = {}

const SubjectList = (props: Props) => {
  const [subjects, setSubjects] = useState([])

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

  const columns = [
    {
      title: 'Mã môn học',
      dataIndex: 'code',
      key: 'code',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Tên môn học',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày thi',
      dataIndex: 'examDate',
      key: 'examDate',
      render: (date: any) => <>{date}</>,
    },
    {
      title: 'Thời gian thi (phút)',
      key: 'examTime',
      dataIndex: 'examTime',
      render: (time: any) => <>{time} phút</>,
    },
    {
      title: 'Điểm',
      dataIndex: 'grade',
      key: 'grade',
      render: (text: string) => <>{text}</>,
    },
  ]

  const data = [
    {
      id: '54654651',
      name: 'Lập trình cơ bản',
      address: 'Lập trình cơ bản',
      tags: ['nice', 'developer'],
    },
    {
      id: '2',
      name: '54656764',
      age: 'Lập trình Nâng Cao',
      address: 'Lập trình Nâng Cao',
      tags: ['loser'],
    },
    {
      id: '3',
      name: '14646516',
      age: 'Lập trình Nâng Web',
      address: 'Lập trình Web',
      tags: ['cool', 'teacher'],
    },
  ]

  console.log(data)

  return <Table columns={columns} dataSource={subjects} />
}

export default SubjectList
