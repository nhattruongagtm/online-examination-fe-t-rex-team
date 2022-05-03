import { Button, Checkbox, DatePicker, Form, Input, Space } from 'antd'
import { useState } from 'react'
import { subjectApi } from '../../../api/subject'

type Props = {}

const AddSubject = (props: Props) => {
  // let message: string
  const [message, setMessage] = useState('')

  const [nameSubject, setNameSubject] = useState('')
  const [idSubject, setIdSubject] = useState('')

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const handleAddSubject = () => {
    subjectApi
      .addSubject(nameSubject, idSubject)
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
        <div
          style={{ color: 'green', fontSize: '1.2rem', marginBottom: '1rem' }}
        >
          {message}
        </div>
        <Form.Item
          label="Name subject"
          name="nameSubject"
          rules={[{ required: true, message: 'Please input name subject!' }]}
        >
          <Input
            value={nameSubject}
            onChange={(e) => setNameSubject(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Code subject"
          name="idSubject"
          rules={[{ required: true, message: 'Please input id subject!' }]}
        >
          <Input
            value={idSubject}
            onChange={(e) => setIdSubject(e.target.value)}
          />
        </Form.Item>

        {/* <Form.Item
          label="Exam date"
          name="examDate"
          rules={[{ required: true, message: 'Please input date exam!' }]}
        >
          <Input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Exam time"
          name="examTime"
          rules={[{ required: true, message: 'Please input time exam!' }]}
        >
          <Input
            type="number"
            placeholder="phút"
            value={examTime}
            onChange={(e) => setExamTime(Number.parseInt(e.target.value))}
          />
        </Form.Item>

        <Form.Item
          label="Grade"
          name="grade"
          rules={[{ required: true, message: 'Please input grade!' }]}
        >
          <Input
            type="number"
            placeholder="phút"
            value={grade}
            onChange={(e) => setGrade(Number.parseFloat(e.target.value))}
          />
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={handleAddSubject}>
            Tạo Môn
          </Button>
          {/* <Button htmlType="button" onClick={onReset}>
          Reset
        </Button> */}
        </Form.Item>
      </Form>
    </div>
  )
}
export default AddSubject
