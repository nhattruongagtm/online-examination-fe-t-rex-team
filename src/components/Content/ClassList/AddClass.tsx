import { Button, Checkbox, DatePicker, Form, Input, Space } from 'antd'
import { useState } from 'react'
import { classApi } from '../../../api/classApi'
import { subjectApi } from '../../../api/subject'

type Props = {}

const AddClass = (props: Props) => {
  // let message: string
  const [message, setMessage] = useState('')

  const [className, setClassName] = useState('')
  const [classID, setClassID] = useState('')

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const handleAddSubject = () => {
    classApi
      .addClass(classID, className)
      .then((res) => {
        console.log(res)
        setMessage(res.message)
        console.log(message)
      })
      .catch((e) => {
        console.log(e)
      })
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
          label="Class ID"
          name="classID"
          rules={[{ required: true, message: 'Please input name classs!' }]}
        >
          <Input value={classID} onChange={(e) => setClassID(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Class Name"
          name="className"
          rules={[{ required: true, message: 'Please input id subject!' }]}
        >
          <Input
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={handleAddSubject}>
            Add class
          </Button>
          {/* <Button htmlType="button" onClick={onReset}>
          Reset
        </Button> */}
        </Form.Item>
      </Form>
    </div>
  )
}
export default AddClass
