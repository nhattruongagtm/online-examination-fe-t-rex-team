import { Button, Checkbox, DatePicker, Form, Input, Space } from 'antd'
import { useState } from 'react'
import { subjectApi } from '../../../api/subject'

type Props = {}

const AddStudent = (props: Props) => {
  // let message: string
  const [message, setMessage] = useState('')

  const [nameSubject, setNameSubject] = useState('')
  const [idSubject, setIdSubject] = useState('')
  const [examDate, setExamDate] = useState('')
  const [examTime, setExamTime] = useState(0)
  const [grade, setGrade] = useState(1)

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const handleAddSubject = () => {
    // subjectApi
    //   .addSubject(nameSubject, idSubject, examDate, examTime, grade)
    //   .then((res) => {
    //     console.log(res)
    //     setMessage(res.message)
    //     console.log(message)
    //   })
    //   .catch((e) => {
    //     console.log(e)
    //   })
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
          label="Tên lớp"
          name="className"
          rules={[{ required: true, message: 'Please input name classs!' }]}
        >
          <Input
            value={nameSubject}
            onChange={(e) => setNameSubject(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Mã môn"
          name="idSubject"
          rules={[{ required: true, message: 'Please input id subject!' }]}
        >
          <Input
            value={idSubject}
            onChange={(e) => setIdSubject(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Ngày thi"
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
          label="Thời gian thi"
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
          label="Khối"
          name="grade"
          rules={[{ required: true, message: 'Please input grade!' }]}
        >
          <Input
            type="number"
            placeholder="phút"
            value={grade}
            onChange={(e) => setGrade(Number.parseFloat(e.target.value))}
          />
        </Form.Item>

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
export default AddStudent
