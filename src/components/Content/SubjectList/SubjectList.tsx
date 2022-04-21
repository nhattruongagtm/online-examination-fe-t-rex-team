import { Button } from 'antd'
import Table from 'antd/lib/table/Table'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { fetchSubject } from '../../../api/demoApi'
import { IRoute } from '../router'

type Props = {}

const SubjectList = (props: Props) => {
  const [subjects, setSubjects] = useState([])
  const navigate = useNavigate()
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
      title: '',
      key: 'list',
      render: (text: string, record: any) => (
        <Button
          onClick={() => navigate(`${IRoute.STUDENT_LIST}?ma-mon-hoc=${123}`)}
        >
          Danh sách sinh viên
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
          Xem đề thi
        </Button>
      ),
    },
  ]

  const data = [
    {
      key: '1',
      id: '54654651',
      name: 'Lập trình cơ bản',
    },
    {
      key: '2',
      id: '54656764',
      name: 'Lập trình Nâng Cao',
    },
    {
      key: '3',
      id: '14646516',
      name: 'Lập trình Nâng Web',
    },
  ]

  return <Table columns={columns} dataSource={subjects} />
}

export default SubjectList
