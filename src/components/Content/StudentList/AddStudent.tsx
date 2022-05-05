import { Button, Checkbox, DatePicker, Form, Input, Space } from 'antd'
import { useState } from 'react'
import { classApi } from '../../../api/classApi'
import { subjectApi } from '../../../api/subject'
import Swal from 'sweetalert2'
import { IClass as IAClass} from '../../Content/ClassList/ClassList'
type Props = {}

const AddClass = (props: Props, {classes}:IAClass) => {
  const [message, setMessage] = useState('')

  const [inputData, setInputData] = useState({classID:'', className:'', u:''})
  const onChange=(e:React.ChangeEvent<HTMLInputElement>) =>{
    setInputData({...inputData,[e.target.name] : e.target})
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)
    
    Swal.fire({
      icon: 'success',
      text: 'Add Class Success',
    })
    classApi
      .addClass(values.classID, values.className)
      .then((res) => {
        // console.log(res)
        setMessage(res.message)
        console.log(message)
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
        {/* <Form.Item
          label="Class Code"
          name="classID"
          rules={[{ required: true, message: 'Please input Class Code!' }]}
        >
          <Input 
          value={inputData.classID} 
          onChange={onChange}
           />
        </Form.Item> */}

        <Form.Item
          label="Name"
          name="className"
          rules={[{ required: true, message: 'Please input Name !' }]}
        >
          <Input
            value={inputData.className}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={onFinish}>
            Add Student
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default AddClass
