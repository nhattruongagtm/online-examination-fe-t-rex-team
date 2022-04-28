import { Button, DatePicker, Form, Input, Select } from 'antd'
import React from 'react'
import Question from '../../components/Content/Test/Question'

const { Option } = Select
type Props = {}

const CreateExam = (props: Props) => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  function onChange(value: any) {
    console.log(`selected ${value}`)
  }

  function onSearch(val: any) {
    console.log('search:', val)
  }
  return (
    <div className="create__exam">
      <div className="create__exam__main">
        <div className="create__exam__title">
          <h3>
            Tạo đề thi môn: <span>Nhập môn CNPM</span>
          </h3>
          <div className="create__exam__form">
            <div className="create__exam__options">
              <div className="create__exam__options__item">
                <h3 className="options__title">Chọn ngày thi</h3>
                <DatePicker />
              </div>
              <div className="create__exam__options__item">
                <h3 className="options__title">Chọn giờ thi</h3>
                <Select
                  placeholder="Select an exam time"
                  onChange={onChange}
                  onSearch={onSearch}
                >
                  <Option value="jack">7:30</Option>
                  <Option value="lucy">9:30</Option>
                  <Option value="tom">12:30</Option>
                  <Option value="dsf">14:30</Option>
                </Select>
              </div>
              <div className="create__exam__options__item btn__upload">
                <Button type="primary">Upload File</Button>
              </div>
            </div>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="create__form"
            >
              <div className="form__title">
                <span>Câu hỏi: 1</span>
                <Input placeholder="Enter your question" />
              </div>
              <div className="form__title">
                <span>Đáp án:</span>
                <Input placeholder="Enter your answer 1" />
                <Input placeholder="Enter your answer 2" />
                <Input placeholder="Enter your answer 3" />
                <Input placeholder="Enter your answer 4" />
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="create__exam__list">
        <div className="create__exam__scroll">
          <div className="question__list__item">
            <div className="question__title">
              Câu 1: <span>{'Ai đã đặt tên cho dòng sông?'}</span>
              <Button>
                <i className="bx bxs-flag"></i>
              </Button>
            </div>
            <ul className="question__answers">
              <li>
                <span>hello</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateExam
