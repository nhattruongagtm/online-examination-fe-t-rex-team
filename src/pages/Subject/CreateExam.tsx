import { EditOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Question from '../../components/Content/Test/Question'
import { Answer } from '../../models/test'
import { addQuestion, deleteQuestion } from '../../slice/examSlice'
import { RootState } from '../../store'

const { Option } = Select
type Props = {}

export interface CreateInput {
  id: number
  title: string
  anwser1: Answer
  anwser2: Answer
  anwser3: Answer
  anwser4: Answer
}

const CreateExam = (props: Props) => {
  const initial: CreateInput = {
    id: Math.floor(Math.random() * 1000),
    title: '',
    anwser1: {
      id: 1,
      title: '',
    },
    anwser2: {
      id: 2,
      title: '',
    },
    anwser3: {
      id: 3,
      title: '',
    },
    anwser4: {
      id: 4,
      title: '',
    },
  }
  const [input, setInput] = useState<CreateInput>(initial)
  const questionState = useSelector(
    (state: RootState) => state.exam.questionList
  )

  const dispatch = useDispatch()
  const onFinish = (values: CreateInput) => {
    console.log(values)
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addQuestion(input))
    console.log(input)
    setInput(initial)
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
            <form name="basic" onSubmit={handleSubmit} className="create__form">
              <div className="form__title">
                <span>Câu hỏi: 1</span>
                <Input
                  placeholder="Enter your question"
                  value={input.title}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form__title">
                <span>Đáp án:</span>

                <Input
                  placeholder={`Enter your answer 1`}
                  value={input.anwser1.title}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      anwser1: {
                        ...input.anwser1,
                        title: e.target.value,
                      },
                    })
                  }
                  name="answer1"
                />

                <Input
                  placeholder={`Enter your answer 2`}
                  value={input.anwser2.title}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      anwser2: {
                        ...input.anwser2,
                        title: e.target.value,
                      },
                    })
                  }
                  name="answer2"
                />

                <input type="radio" />
                <Input
                  placeholder={`Enter your answer 3`}
                  value={input.anwser3.title}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      anwser3: {
                        ...input.anwser3,
                        title: e.target.value,
                      },
                    })
                  }
                  name="answer3"
                />

                <Input
                  placeholder={`Enter your answer 4`}
                  value={input.anwser4.title}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      anwser4: {
                        ...input.anwser4,
                        title: e.target.value,
                      },
                    })
                  }
                  name="answer4"
                />
              </div>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="create__exam__list">
        <div className="create__exam__scroll">
          {questionState.map((item, index) => (
            <div className="question__list__item" key={item.id}>
              <div className="question__title">
                Câu {index + 1}: <span>{item.title}</span>
                <Button>
                  <i className="bx bxs-edit"></i>
                </Button>
                <Button onClick={() => dispatch(deleteQuestion(item.id))}>
                  <i className="bx bx-message-square-x"></i>
                </Button>
              </div>
              <ul className="question__answers">
                <li>
                  <span>A.</span>
                  <span>{item.anwser1.title}</span>
                </li>
                <li>
                  <span>B.</span>
                  <span>{item.anwser2.title}</span>
                </li>
                <li>
                  <span>C.</span>
                  <span>{item.anwser3.title}</span>
                </li>
                <li>
                  <span>D.</span>
                  <span>{item.anwser4.title}</span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CreateExam
