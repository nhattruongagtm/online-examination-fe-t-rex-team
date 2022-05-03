import { EditOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, Radio, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useCSVReader } from 'react-papaparse'
import { useDispatch, useSelector } from 'react-redux'
import Question from '../../components/Content/Test/Question'
import { CreateExamRequest } from '../../models/responseData'
import { Answer, QuestionRequest } from '../../models/test'
import { examApi } from '../../api/history'
import {
  addQuestion,
  deleteQuestion,
  loadEdit,
  resetEdit,
  updateQuestion,
} from '../../slice/examSlice'
import { RootState } from '../../store'

const { Option } = Select
type Props = {}

export interface CreateInput {
  id: number
  title: string
  anwsers: Answer[]
  correct: number
}

const CreateExam = (props: Props) => {
  const initial: CreateInput = {
    id: -1,
    title: '',
    correct: 1,
    anwsers: [
      {
        id: 1,
        title: '',
      },
      {
        id: 2,
        title: '',
      },
      {
        id: 3,
        title: '',
      },
      {
        id: 4,
        title: '',
      },
    ],
  }
  const answerPrefix = ['A', 'B', 'C', 'D']
  const edit = useSelector((state: RootState) => state.exam.edit)
  const [input, setInput] = useState<CreateInput>(edit)
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
  const { CSVReader } = useCSVReader()

  const isValidate = () => {
    if (
      input.title !== '' &&
      input.anwsers.findIndex((item) => item.title === '') === -1
    ) {
      return false
    }
    return true
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // create
    if (input.id === -1) {
      if (!isValidate()) {
        dispatch(
          addQuestion({
            ...input,
            id: Math.floor(Math.random() * 9000),
          })
        )
        setInput(initial)
      }
    } else {
      // update
      dispatch(updateQuestion(input))
      dispatch(resetEdit())
    }
  }
  const handleOnChange = (value: string, index: number) => {
    const newAnswers = [...input.anwsers]
    newAnswers[index] = {
      ...newAnswers[index],
      title: value,
    }
    setInput({
      ...input,
      anwsers: newAnswers,
    })
  }

  useEffect(() => {
    setInput(edit)
  }, [edit])

  const handleCreateExam = () => {
    const newQuestions: any[] = questionState.map((item) => {
      return {
        title: item.title,
        correct: item.correct,
        answers: item.anwsers.map((ans) => {
          return {
            title: ans.title,
          }
        }),
      }
    })
    const request: CreateExamRequest = {
      idSubject: 1,
      listQuestions: newQuestions,
    }
    examApi
      .createExam(request)
      .then((res) => {
        if (res) {
          alert('Tạo đề thi thành công!')
        }
      })
      .catch((e) => {
        console.log(e)
      })
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
                <Button>Upload File</Button>
                {/* <CSVReader></CSVReader> */}
              </div>
              <div className="create__exam__options__item btn__upload">
                <Button type="primary" onClick={handleCreateExam}>
                  Create
                </Button>
              </div>
            </div>
            <form name="basic" onSubmit={handleSubmit} className="create__form">
              <div className="form__title">
                <span>
                  Câu hỏi:{' '}
                  {edit.id === -1
                    ? questionState.length + 1
                    : questionState.findIndex((item) => item.id === edit.id) +
                      1}
                </span>

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
                <div className="answer__item__main">
                  <Radio.Group
                    className="answer__item__radio"
                    defaultValue={input.correct}
                  >
                    {Array.from(new Array(4)).map((item, index) => (
                      <Radio
                        value={index + 1}
                        checked={index + 1 === input.correct}
                        onChange={(e) =>
                          setInput({
                            ...input,
                            correct: Number(e.target.value),
                          })
                        }
                      />
                    ))}
                  </Radio.Group>
                  <div className="answer__item__input">
                    {input.anwsers.map((item, index) => (
                      <Input
                        key={index}
                        placeholder={`Enter your answer ${index + 1}`}
                        value={item.title}
                        onChange={(e) => handleOnChange(e.target.value, index)}
                        name="answer1"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <Button
                type={input.id === -1 ? 'primary' : 'ghost'}
                htmlType="submit"
                disabled={isValidate()}
              >
                {edit.id !== -1 ? 'Update' : 'Add'}
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
                <Button onClick={() => dispatch(loadEdit(item))}>
                  <i className="bx bxs-edit"></i>
                </Button>
                <Button onClick={() => dispatch(deleteQuestion(item.id))}>
                  <i className="bx bx-message-square-x"></i>
                </Button>
              </div>
              <ul className="question__answers">
                {item.anwsers.map((ans, index) => (
                  <li>
                    <span>{answerPrefix[index]}.</span>
                    <span>{ans.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CreateExam
