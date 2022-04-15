import { Space, Table, Tag } from 'antd'
import React from 'react'

type Props = {}

const History = (props: Props) => {
  const columns = [
    {
      title: 'Mã môn học',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Tên môn học',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Ngày thi',
      dataIndex: 'address',
      key: 'address',
      render: (date: any) => <>10/4/2022</>,
    },
    {
      title: 'Thời gian thi (phút)',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: any) => <>60 phút</>,
    },
    {
      title: 'Điểm',
      key: 'action',
      render: (text: string, record: any) => <>10</>,
    },
  ]

  const data = [
    {
      key: '1',
      name: '54654651',
      age: 'Lập trình cơ bản',
      address: 'Lập trình cơ bản',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: '54656764',
      age: 'Lập trình Nâng Cao',
      address: 'Lập trình Nâng Cao',
      tags: ['loser'],
    },
    {
      key: '3',
      name: '14646516',
      age: 'Lập trình Nâng Web',
      address: 'Lập trình Web',
      tags: ['cool', 'teacher'],
    },
  ]
  return <Table columns={columns} dataSource={data} />
}

export default History
