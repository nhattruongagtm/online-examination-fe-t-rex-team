import { Button, Checkbox, DatePicker, Form, Input, Select, Space } from 'antd'
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

type Props = {}

const AddClass = (props: Props, { classes }: IAClass) => {
  const user = JSON.parse(
    localStorage.getItem('e-exam') as string
  ) as LoginResponse
  const [students, setStudents] = useState<Class[]>([])
  const param = useLocation()
  const [visible, setVisible] = useState(false)
  const id = Number(qs.parse(param.search).classID)
  const [message, setMessage] = useState('')

  const [inputData, setInputData] = useState({ classID: '', className: '', u: '' })
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, [e.target.name]: e.target })
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)

  //   classApi
  //     .addClass(values.classID, values.className)
  //     .then((res) => {
  //       // console.log(res)
  //       setMessage(res.message)
  //       console.log(message)

  //       Swal.fire({
  //         icon: 'success',
  //         text: 'Add Class Success',
  //       })
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  
function handleChange(value: any) {
  console.log(`selected ${value}`);
} 

  const { Option } = Select;

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }

  useEffect(() => {
    fetchStudent.fetchDataStudent(id).then(
      (response) => {
        console.log(response)
        setStudents(response);
      },
      (error) => {
        console.log(error)
      }
    )
  }, []) 
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
          {children}
          
        </Select>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" style={{ marginTop: '1rem' }} htmlType="submit" onClick={onFinish}>
            Add Student
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default AddClass
