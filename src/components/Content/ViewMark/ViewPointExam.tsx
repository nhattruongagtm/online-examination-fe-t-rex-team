import { Button, Select } from 'antd'
import Table, { ColumnsType, TableProps } from 'antd/lib/table/Table'
import { useEffect, useState } from 'react'
import useUser from '../../../hook/useUser'
import { examApi as examApis } from '../../../api/examApi'
import * as yup from 'yup'
import { Subject } from '../../../models/subject'
import { Class, TestStudent, ViewMark } from '../../../models/class'
import { fetchClass } from '../../../api/demoApi'
import { classApi } from '../../../api/classApi'

const { Option } = Select

type Props = {}

export interface SubjectList {
  id: number
  title: string
}

export interface IParam {
  subjectID: string
}
export interface IClass {
  classes: {
    classID: number
    className: string
    u: TestStudent[]
  }
}

const ViewPointExam = (props: Props) => {
  //GET SUBJECT
  const [subjectList, setSubjectList] = useState<Subject[]>([])
  const [user] = useUser()

  const [subjectId, setSubjectId] = useState(Number)

  const handleGetSubjectId = (value: string) => {
    const getSubjectId = Number(value)
    setSubjectId(getSubjectId)
    console.log('subjectId', value)
  }

  useEffect(() => {
    user &&
      examApis
        .loadSubjectByTeacherID(user.id)
        .then((res) => {
          console.log('ds mon hoc:', res)
          setSubjectList(res)
        })
        .catch((e) => {
          console.log(e)
        })
  }, [])

  //GET CLASS
  const [classes, setClasses] = useState<Class[]>([])
  const [classId, setClassId] = useState(Number)

  const handleGetClassesId = (value: string) => {
    const getClassesId = Number(value)
    setClassId(getClassesId)
    console.log('classId', value)
  }

  useEffect(() => {
    subjectId &&
      fetchClass.fetchData(subjectId).then(
        (response) => {
          console.log('ds lop trong mon hoc: ', response)
          setClasses(response)
        },
        (error) => {
          console.log(error)
        }
      )
  }, [subjectId])

  //GET STUDENT LIST AND GRADE
  const [students, setStudents] = useState<ViewMark[]>([])

  const validationShema = yup.object().shape({
    subjectID: yup.number().required('Please choose a subject!'),
  })

  const handGetAllMarks = () => {
    classApi.getAllMarks(subjectId, classId).then((response) => {
      console.log('ds điểm:', response)
      setStudents(response)
    })
  }

  const columns: ColumnsType<ViewMark> = [
    {
      title: 'Student ID',
      dataIndex: 'id',
      render: (text: number) => <>{text}</>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'fullname',
      render: (text: string) => <>{text}</>,
      sorter: (a, b) => a.fullname.length - b.fullname.length,
      width: '30%',
    },
    {
      title: 'Correct answer',
      dataIndex: 'correct',
      render: (text: string, record: ViewMark) => (
        <>
          {record.correct}/{record.total}
        </>
      ),
      sorter: (a, b) => a.id - b.id,
      align: 'right',
      width: '17%',
    },
    {
      title: 'Mark',
      dataIndex: 'mark',
      render: (text: number) => <>{text}</>,
      sorter: (a, b) => a.mark - b.mark,
      align: 'right',
    },
    {
      title: 'Time',
      dataIndex: 'createDate',
      render: (text: string) => <>{text}</>,
      // filters: [
      //   {
      //     text: 'London',
      //     value: 'London',
      //   },
      //   {
      //     text: 'New York',
      //     value: 'New York',
      //   },
      // ],
      align: 'right',
    },
  ]

  const onChange: TableProps<ViewMark>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  return (
    <>
      <div className="view_point">
        <div className="view_point__main">
          <div className="view_point__title">
            <h3>
              Choose a Subject:{' '}
              <Select
                placeholder="Select a subject"
                className="select__subjects"
                onChange={handleGetSubjectId}
              >
                {subjectList.map((item) => (
                  <Option value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </h3>
            <h3>
              Choose a class:{' '}
              <Select
                placeholder="Select a class"
                className="select__subjects"
                onChange={handleGetClassesId}
              >
                {classes.map((item) => (
                  <Option value={item.classID}>{item.className}</Option>
                ))}
              </Select>
            </h3>
            <div className="view_point__btn_submit">
              <Button onClick={handGetAllMarks} type="primary">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Table columns={columns} dataSource={students} onChange={onChange} />
    </>
  )
}

export default ViewPointExam
