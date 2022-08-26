import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { Pie, measureTextWidth } from '@ant-design/plots'
import {
  Row,
  Col,
  Card,
  Button,
  Dropdown,
  Menu,
  message,
  Space,
  Table,
  Select,
} from 'antd'
import { fetchStudent, studentApi } from '../../../api/student'
import { subjectApi } from '../../../api/subject'
import { User } from '../../../models/user'
import { Subject } from '../../../models/subject'
import { Class, ViewMark } from '../../../models/class'
import AttendanceChart from './AttendanceChart'
import ClassifyChart from './ClassifyChart'
import { UserOutlined, DownOutlined } from '@ant-design/icons'
import { fetchClass, fetchSubject } from '../../../api/demoApi'
import { useDispatch, useSelector } from 'react-redux'
import { loadSubjectList } from '../../../slice/subjectSlice'
import useUser from '../../../hook/useUser'
import { click } from '@testing-library/user-event/dist/click'
import { number } from 'yup'
import { get } from '../../../api/student'
import MarkColumn from './MarkColumn'
import { RootState } from '../../../store'
import { loadClassList } from '../../../slice/classSlice'
import { loadStudentList } from '../../../slice/studentSlice'
import { classApi } from '../../../api/classApi'
import { ColumnsType } from 'antd/lib/table'

type Props = {}

interface InputForm {
  password: string
  confirmPwd: string
}
const { Option } = Select
const Dashboard = (props: Props) => {
  //state for api
  const [students, setStudents] = useState<ViewMark[]>([])
  const [subject, setSubject] = useState<Subject[]>([])
  const [classes, setClasses] = useState<Class[]>([])
  const dispatch = useDispatch()
  const ref = useRef<User[]>([])
  const [u] = useUser()
  const [idClass, setIdClass] = useState<number | undefined>()
  const subjectList = useSelector(
    (state: RootState) => state.subjects.subjectList
  )
  const studentList = useSelector(
    (state: RootState) => state.studentList.student
  )

  const [bordered, setBordered] = useState(true)
  const [xScroll, setXScroll] = useState(undefined)
  const [tableLayout, setTableLayout] = useState(undefined)
  const scroll = {}
  const tableProps = { bordered, scroll, xScroll, tableLayout }
  console.log(idClass)

  // get all subject
  useEffect(() => {
    subjectApi.getAllSubject().then(
      (responses) => {
        console.log(responses)
        setSubject(responses)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  //get all class by subject ID
  useEffect(() => {
    fetchClass.fetchData(1).then(
      (responses) => {
        console.log(responses)
        setClasses(responses)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  //get user by class ID
  useEffect(() => {
    fetchStudent.fetchDataStudent(5).then(
      (response) => {
        console.log(response)
        ref.current = response
        dispatch(loadStudentList(response))
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  const columns:ColumnsType<ViewMark> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: any, b: any) => a.id - b.id,
      render: (text: any) => <>{text}</>,
    },
    // {
    //   title: 'Subject',
    //   dataIndex: 'name',
    //   key: 'name',
    //   filters: [
    //     {
    //       text: 'Agile',
    //       value: 'Agile',
    //     },
    //     {
    //       text: 'CMMI',
    //       value: 'CMMI',
    //     },
    //     {
    //       text: 'CSDL',
    //       value: 'CSDL 2',
    //     },
    //     {
    //       text: 'UI',
    //       value: 'UI',
    //     },
    //     {
    //       text: 'LTNC',
    //       value: 'LTNC',
    //     },
    //     {
    //       text: 'TKHDT',
    //       value: 'TKHDT',
    //     },
    //     {
    //       text: 'HDHNC',
    //       value: 'HDHNC',
    //     },
    //     {
    //       text: 'CTMT',
    //       value: 'CTMT',
    //     },
    //   ],
    //   filterSearch: true,
    //   onFilter: (value: any, record: any) => subject[0].name.startsWith(value),
    // },
    // {
    //   title: 'Class',
    //   dataIndex: 'responses.classes.className',
    //   key: 'responses.classes.className',
    // },
    {
        title: 'Name',
        dataIndex: 'fullname',
        render: (text: string) => <>{text}</>,
        sorter: (a: { fullname: string | any[] }, b: { fullname: string | any[] }) => a.fullname.length - b.fullname.length,
        width: '30%',
      },
      {
        title: 'Mark',
        dataIndex: 'mark',
        render: (text: number) => <>{text}</>,
        sorter: (a: { mark: number }, b: { mark: number }) => a.mark - b.mark,
        align: 'right',
      },
    {
      title: 'Time',
      dataIndex: 'createDate',
      key: 'createDate',
      sorter: (a: any, b: any) => a.releaseDate - b.releaseDate,
    },
  ]

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const handleChangeStudent = (value: any) => {
    // fetchStudent.fetchDataStudent(value).then(
    //   (response) => {
    //     console.log(response)
    //     ref.current = response
    //     dispatch(loadStudentList(response))
    //   },
    //   (error) => {
    //     console.log(error)
    //   }
    // )
    classApi.getAllMarks(subjectId, value).then((response) => {
        console.log('ds điểm:', response)
        // dispatch(loadMarkList(response))
        setStudents(response)
      })
  }

  const [subjectId, setSubjectId] = useState(Number)
  const handleChange = (value: any) => {
    // console.log("selected" ${value})
    fetchClass.fetchData(value).then(
        (responses) => {
            console.log(responses)
            setClasses(responses)
        },
        (error) => {
            console.log(error)
        }
    )
  }

  return (
    <div>
      <div
        className="site-card-wrapper"
        style={{ marginBottom: '3rem', padding: '0.5rem', background: '#ddd' }}
      >
        <Row gutter={18}>
          <Col span={8} style={{}}>
            <Card
              title="Students Count"
              style={{ fontWeight: '700' }}
              bordered={true}
            >
              {students.length}
            </Card>
          </Col>
          <Col span={4}>
            <Card
              title="Excellent"
              style={{ fontWeight: '700' }}
              bordered={true}
            >
              1
            </Card>
          </Col>
          <Col span={4}>
            <Card title="Good" style={{ fontWeight: '700' }} bordered={true}>
              1
            </Card>
          </Col>
          <Col span={4}>
            <Card title="Average" style={{ fontWeight: '700' }} bordered={true}>
              23
            </Card>
          </Col>
          <Col span={4}>
            <Card
              title="Below Average"
              style={{ fontWeight: '700' }}
              cover
              bordered={true}
            >
              1
            </Card>
          </Col>
        </Row>
      </div>

      <div
        className="chart"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '2rem',
        }}
      >
        <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
          <MarkColumn />
        </div>

        <div className="classify">
          <ClassifyChart />
        </div>
      </div>
      <div className="filter" style={{ display: 'flex' }}>
        <div
          className="filter-subject"
          style={{ padding: '1rem 1rem 0.5rem 0' }}
        >
          <div style={{ fontWeight: '600' }}>Select Subject: </div>
          <Select
            defaultValue={1}
            style={{
              width: 300,
            }}
            onChange={handleChange}
            filterOption={(input, option) => {
              console.log('input', input)
              console.log('option', option)
              return true
            }}
          >
            {subject.map((sub, index) => (
              <Option key={index} value={sub.id}>
                {sub.id} - {sub.name}
              </Option>
            ))}
          </Select>
        </div>
        <div className="filter-class" style={{ padding: '1rem 1rem 0.5rem 0' }}>
          <div style={{ fontWeight: '600' }}>Select Class: </div>
          <Select
            style={{
              width: 300,
            }}
            onChange={handleChangeStudent}
          >
            {classes.map((classes, index) => (
              <Option key={index} value={classes.classID}>
                {classes.classID} - {classes.className}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="table" style={{ margin: '0 -1rem' }}>
        <Table
          className={'table'}
          {...tableProps}
          size={'small'}
          scroll={scroll}
          columns={columns}
          dataSource={students}
          // dataSource={subject}
        />
      </div>
    </div>
  )
}

export default Dashboard
function loadMarkList(response: ViewMark[]): any {
    throw new Error('Function not implemented.')
}