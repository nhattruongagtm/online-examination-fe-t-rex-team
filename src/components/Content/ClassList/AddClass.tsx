import { Button, Checkbox, DatePicker, Form, Input, Space } from 'antd'
import { useState } from 'react'
import { classApi } from '../../../api/classApi'
import { subjectApi } from '../../../api/subject'
import Swal from 'sweetalert2'
import { IClass as IAClass} from './ClassList'
import { studentApi } from '../../../api/student'
import { useDispatch } from 'react-redux'
import { Class } from '../../../models/class'
import { createClass } from '../../../slice/classSlice'
type Props = {
  subjectID: number
}

const AddClass = ({subjectID}: Props, {classes}:IAClass) => {
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

  const [inputData, setInputData] = useState<string>('')
  const onChange=(e:React.ChangeEvent<HTMLInputElement>) =>{
    setInputData(e.target.value)
  }

  const onFinish = (value: any) => {
    classApi
      .addClass(subjectID, value.className)
      .then((res) => {
        // console.log(res)
        setMessage(res.message)
        console.log(res)

        Swal.fire({
          icon: 'success',
          text: 'Add Class Success',
        })
        dispatch(createClass(res.object as Class))
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const handleAddSubject = () => {

  }

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
        style={{ width: '500px' }}
      >
        <div style={{ color: 'green', fontSize: '1.5rem' }}>{message}</div>

        <Form.Item
          label="Class Name"
          name="className"
          rules={[{ required: true, message: 'Please input Class Name !' }]}
        >
          <Input
            value={inputData}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Add class
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default AddClass
