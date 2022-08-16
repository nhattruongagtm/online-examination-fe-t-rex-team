import { Button, Select } from 'antd'
import Table, { ColumnsType, TableProps } from 'antd/lib/table/Table'
import { useEffect, useState } from 'react'
import useUser from '../../../hook/useUser'
import { examApi as examApis } from '../../../api/examApi'
import * as yup from 'yup'
import { Subject } from '../../../models/subject'
import { Class, TestStudent } from '../../../models/class'
import { fetchClass } from '../../../api/demoApi'

const { Option } = Select

interface DataType {
  id: number
  name: string
  grade: number
  time: string
}

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
  const [subjectId, setSubjectId] = useState()

  useEffect(() => {
    user &&
      examApis
        .loadSubjectByTeacherID(user.id)
        .then((res) => {
          console.log(res)
          setSubjectList(res)
        })
        .catch((e) => {
          console.log(e)
        })
  }, [])

  //GET CLASS
  const [classes, setClasses] = useState<Class[]>([])
  const [classId, setClassId] = useState()
  // console.log("id",subjectList[0].id)

  const [id, setId] = useState(1)
  const handleGetIdSubject = (value: string) => {
    const getSubjectId = Number(value)
    setId(getSubjectId)
    console.log('id', value)
  }

  useEffect(() => {
    fetchClass.fetchData(id).then(
      (response) => {
        console.log('test cho ni: ', response)
        setClasses(response)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [id])
  //GET STUDENT LIST AND GRADE
  const validationShema = yup.object().shape({
    subjectID: yup.number().required('Please choose a subject!'),
  })

  const columns: ColumnsType<DataType> = [
    {
      title: 'Student ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Category 1',
          value: 'Category 1',
          children: [
            {
              text: 'Yellow',
              value: 'Yellow',
            },
            {
              text: 'Pink',
              value: 'Pink',
            },
          ],
        },
        {
          text: 'Category 2',
          value: 'Category 2',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      // onFilter: (value: string, record) => record.name.includes(value),
      width: '30%',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      sorter: (a, b) => a.grade - b.grade,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      // onFilter: (value: string, record) => record.address.startsWith(value),
      // filterSearch: true,
      // width: '40%',
    },
  ]

  const data: DataType[] = [
    {
      id: 18130123,
      name: 'John Brown',
      grade: 7,
      time: '1:30:00',
    },
    {
      id: 18130100,
      name: 'Jim Green',
      grade: 8,
      time: '1:30:00',
    },
    {
      id: 18130099,
      name: 'Joe Black',
      grade: 9,
      time: '1:30:00',
    },
    {
      id: 18130231,
      name: 'Jim Red',
      grade: 10,
      time: '1:30:00',
    },
  ]

  const onChange: TableProps<DataType>['onChange'] = (
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
                onChange={handleGetIdSubject}
              >
                {subjectList.map((item) => (
                  <Option value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </h3>
            <h3>
              Choose a class:{' '}
              <Select placeholder="Select a class" className="select__subjects">
                {classes.map((item) => (
                  <Option value={item.classID}>{item.className}</Option>
                ))}
              </Select>
            </h3>
            <div className="view_point__btn_submit">
              <Button type="primary">Submit</Button>
            </div>
          </div>
        </div>
      </div>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </>
  )
}

export default ViewPointExam
function Any(Any: any): [any, any] {
  throw new Error('Function not implemented.')
}
