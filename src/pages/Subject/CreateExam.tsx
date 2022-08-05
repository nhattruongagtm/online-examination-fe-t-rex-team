import { Button, DatePicker, Input, Radio, Select } from 'antd'
import React, { useEffect, useState, CSSProperties } from 'react'
import { useCSVReader } from 'react-papaparse'
import { useDispatch, useSelector } from 'react-redux'
import { examApi } from '../../api/history'
import { examApi as examApis } from '../../api/examApi'
import useUser from '../../hook/useUser'
import { CSVResponse } from '../../models/exam'
import { CreateExamRequest } from '../../models/responseData'
import { Answer } from '../../models/test'
import * as yup from 'yup'
import { QuestionResp } from '../../models/test'
import { Subject } from '../../models/subject'
import moment from 'moment'
import {
  addQuestion,
  deleteQuestion,
  editCorrect,
  loadEdit,
  loadQuestions,
  resetEdit,
  updateQuestion,
} from '../../slice/examSlice'
import { RootState } from '../../store'

const { Option } = Select
type Props = {}

export interface ExamTest {
  id: number
  date: string
  createdDate: string
  duration: number
  time: string
  questions: QuestionResp
  subject: Partial<Subject>
}

export interface CreateInput {
  id: number
  title: string
  answers: Answer[]
  correct: number
}

export interface FormInput {
  duration: number
  date: string
  time: string
  teacherID: number
  subjectID: number
  createdDate: string
}

const CreateExam = (props: Props) => {
  const initial: CreateInput = {
    id: -1,
    title: '',
    correct: 1,
    answers: [
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
  const { CSVReader } = useCSVReader()

  const answerPrefix = ['A', 'B', 'C', 'D']
  const edit = useSelector((state: RootState) => state.exam.edit)
  const editTest = useSelector((state: RootState) => state.exam.editTest)
  const [input, setInput] = useState<CreateInput>(edit)
  const [subjectList, setSubjectList] = useState<Subject[]>([])
  const [user] = useUser()
  const [formInput, setFormInput] = useState<FormInput>({
    date: editTest?.date || '',
    duration: editTest?.duration || -1,
    time: editTest?.time || '',
    subjectID: -1,
    teacherID: user ? user.id : -1,
    createdDate: `${new Date().getFullYear()}-${
      new Date().getMonth() + 1 < 10
        ? `0${new Date().getMonth() + 1}`
        : new Date().getMonth() + 1
    }-${
      new Date().getDate() < 10
        ? `0${new Date().getDate()}`
        : new Date().getDate()
    }`,
  })
  const validationShema = yup.object().shape({
    date: yup.string().required('Please choose an exam date!'),
    duration: yup.number().required('Please choose an exam duration!'),
    time: yup.number().required('Please choose an exam time!'),
    subjectID: yup.number().required('Please choose a subject!'),
  })
  const questionState = useSelector(
    (state: RootState) => state.exam.questionList
  )
  const dispatch = useDispatch()

  const isValidate = () => {
    if (
      input.title !== '' &&
      input.answers.findIndex((item) => item.title === '') === -1
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
    const newAnswers = [...input.answers]
    newAnswers[index] = {
      ...newAnswers[index],
      title: value,
    }
    setInput({
      ...input,
      answers: newAnswers,
    })
  }

  useEffect(() => {
    user &&
      examApis
        .loadSubjectByTeacherID(user.id)
        .then((res) => {
          console.log(res)
          setSubjectList(res)
        })
        .catch((e) => {
          console.log(e)
        })
  }, [])

  useEffect(() => {
    setInput(edit)
  }, [edit])

  const handleCreateExam = () => {
    if (user) {
      const newQuestions: any[] = questionState.map((item) => {
        return {
          title: item.title,
          correct: item.correct,
          answers: item.answers.map((ans) => {
            return {
              title: ans.title,
            }
          }),
        }
      })

      const { date, duration, subjectID, teacherID, time, createdDate } =
        formInput
      const data: FormInput & CreateExamRequest = {
        teacherID,
        date,
        duration,
        subjectID,
        time,
        listQuestions: newQuestions,
        createdDate,
      }

      console.log(data)

      examApi
        .createExam({ ...data, time: time + ':00' })
        .then((res) => {
          if (res) {
            alert('Tạo đề thi thành công!')
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  const handleGetData = (result: CSVResponse<string>) => {
    const data = result.data

    let rs: CreateInput[] = []
    data.slice(1, data.length - 1).map((item) => {
      const id = Number(Math.floor(Math.random() * 9000))
      const title = item[1]
      const answers: Answer[] = [
        {
          id: 1,
          title: item[2],
        },
        {
          id: 2,
          title: item[3],
        },
        {
          id: 3,
          title: item[4],
        },
        {
          id: 4,
          title: item[5],
        },
      ]
      const correct = answers.find((ans) => ans.title === item[6])?.id as number

      const qs: CreateInput = {
        id,
        title,
        answers,
        correct,
      }
      rs.push(qs)
    })
    dispatch(loadQuestions([...questionState, ...rs]))
  }

  const onChangeDate = (date: any, dateString: string) => {
    setFormInput({
      ...formInput,
      date: dateString,
    })
  }

  const handleUpdateExam = () => {
    console.log('')
  }

  const RadioCheck = () => {
    return (
      <Radio.Group className="answer__item__radio" defaultValue={edit.correct}>
        {Array.from(new Array(4)).map((item, index) => (
          <Radio
            value={index + 1}
            // checked
            onChange={(e) => dispatch(editCorrect(Number(e.target.value)))}
          />
        ))}
      </Radio.Group>
    )
  }

  return (
    <div className="create__exam">
      <div className="create__exam__main">
        <div className="create__exam__title">
          <h3>
            {edit ? 'Update' : 'Create'} an Exam:{' '}
            <Select
              placeholder="Select an exam time"
              className="select__subjects"
              onChange={(e) =>
                setFormInput({
                  ...formInput,
                  subjectID: Number(e),
                })
              }
              defaultValue={editTest && (editTest as any).subject.id}
            >
              {subjectList.map((item) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </h3>
          <div className="create__exam__form">
            <div className="create__exam__options">
              <div className="create__exam__options__item">
                <h3 className="options__title">Exam Date</h3>
                <DatePicker
                  onChange={onChangeDate}
                  defaultValue={moment(editTest?.date) || ''}
                />
              </div>
              <div className="create__exam__options__item">
                <h3 className="options__title">Exam Time</h3>
                <Select
                  placeholder="Select an exam time"
                  onChange={(e) =>
                    setFormInput({
                      ...formInput,
                      time: e,
                    })
                  }
                  defaultValue={editTest?.time || ''}
                >
                  <Option value="7:30">7:30</Option>
                  <Option value="9:30">9:30</Option>
                  <Option value="12:30">12:30</Option>
                  <Option value="14:30">14:30</Option>
                </Select>
              </div>
              <div className="create__exam__options__item">
                <h3 className="options__title">Duration</h3>
                <Select
                  placeholder="Select an exam time"
                  onChange={(e) =>
                    setFormInput({
                      ...formInput,
                      duration: Number(e),
                    })
                  }
                  defaultValue={editTest?.duration}
                >
                  <Option value="15">15 minutes</Option>
                  <Option value="30">30 minutes</Option>
                  <Option value="45">45 minutes</Option>
                  <Option value="60">60 minutes</Option>
                  <Option value="75">75 minutes</Option>
                  <Option value="90">90 minutes</Option>
                  <Option value="100">100 minutes</Option>
                  <Option value="120">120 minutes</Option>
                </Select>
              </div>
              <div className="create__exam__options__item btn__upload">
                <CSVReader onUploadAccepted={handleGetData}>
                  {({
                    getRootProps,
                    acceptedFile,
                    ProgressBar,
                    getRemoveFileProps,
                  }: any) => <Button {...getRootProps()}>Upload File</Button>}
                </CSVReader>
              </div>
              <div className="create__exam__options__item btn__upload">
                {edit ? (
                  <Button type="primary" danger onClick={handleUpdateExam}>
                    Update
                  </Button>
                ) : (
                  <Button type="primary" onClick={handleCreateExam}>
                    Create
                  </Button>
                )}
              </div>
            </div>
            <form name="basic" onSubmit={handleSubmit} className="create__form">
              <div className="form__title">
                <span>
                  Question:{' '}
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
                <span>Answer:</span>
                <div className="answer__item__main">
                  <RadioCheck />
                  <div className="answer__item__input">
                    {input.answers.map((item, index) => (
                      <Input
                        key={index}
                        placeholder={`Enter your answer ${index + 1}`}
                        value={item.title}
                        onChange={(e) => handleOnChange(e.target.value, index)}
                        name="answer1"
                        style={{
                          backgroundColor:
                            edit.correct === index + 1 ? '#daf8ff' : '',
                        }}
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
                <span>
                  Question {index + 1}: {item.title}
                </span>
                <Button onClick={() => dispatch(loadEdit(item as CreateInput))}>
                  <i className="bx bxs-edit"></i>
                </Button>
                <Button
                  onClick={() => dispatch(deleteQuestion(item.id as number))}
                >
                  <i className="bx bx-message-square-x"></i>
                </Button>
              </div>
              <ul className="question__answers">
                {(item.answers as Answer[]).map((ans, index) => (
                  <li key={ans.id}>
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
