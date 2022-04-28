import { Table } from 'antd'
import React from 'react'
import { useParams } from 'react-router'

type Props = {}

const StudentList = (props: Props) => {
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
  return <Table columns={columns} dataSource={data} />
}

export default StudentList
