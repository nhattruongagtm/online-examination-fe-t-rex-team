import { Button, Checkbox, DatePicker, Form, Input, Select, Space, Table } from 'antd'
import { useEffect, useState } from 'react'
import { classApi } from '../../../api/classApi'
import { subjectApi } from '../../../api/subject'
import Swal from 'sweetalert2'
import { IClass as IAClass } from '../../Content/ClassList/ClassList'
import { LoginResponse } from '../../../pages/Login/Login'
import { fetchStudent } from '../../../api/student'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'
import { Class } from '../../../models/class'
import { User } from '../../../models/user'
import { useDispatch } from 'react-redux'
import { createStudent } from '../../../slice/studentSlice'
import { userApi } from '../../../api/userApi'

type Props = {
  classID: number
  classesName: string
}
export interface IClass {
  classes: {
    u: {
      id?: number;
      fullName?: string;
      email?: string;
    }
  }
}
const AddClass = ({ classID, classesName }: Props, { classes }: IAClass) => {
  const user = JSON.parse(
    localStorage.getItem('e-exam') as string
  ) as LoginResponse
  const [students, setStudents] = useState<User[]>([])
  const param = useLocation()
  const [visible, setVisible] = useState(false)
  const id = Number(qs.parse(param.search).classID)
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const [select, setSelect] = useState<string[]>([])
  const [inputData, setInputData] = useState({ classID: '', className: '', u: '' })
  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputData({ ...inputData, [e.target.name]: e.target })
  // }
  useEffect(() => {
    fetchStudent.getAllStudent().then(
      (response) => {
        console.log(response)
        setStudents(response);
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  const onFinish = (value: any) => {
    select.map(item => {
      console.log(item, classesName, classID)
      fetchStudent
        .addStuToClass(Number(item), classesName, classID)
        .then((res) => {
          console.log(res)
          userApi.getUserByID(Number(item)).then(res => {
            dispatch(createStudent(res))
          }).catch(e => {
            console.log(e)
          })
        })
        .catch((e) => {
          console.log(e)
        })
    })

    // Swal.fire({
    //   icon: 'success',
    //   text: 'Add Student Success',
    // })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  function handleChange(value: string[]) {
    console.log(value)
    setSelect(value as string[])

  }

  const { Option } = Select;
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ width: '100%' }}
      >
        <div style={{ color: 'green', fontSize: '1.5rem' }}>{message}</div>

        <Select mode="tags" style={{ width: '100%' }} onChange={handleChange} tokenSeparators={[',']}>
          {students.map((s) => (
            <Option key={s.id} >
              {s.id} - {s.fullName}
            </Option>
          ))}
        </Select>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" style={{ marginTop: '1rem' }} htmlType="submit">
            Add Student
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default AddClass
