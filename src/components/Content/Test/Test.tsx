import { Button, Layout, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { examApi } from '../../../api/examApi'
import { submitTest } from '../../../api/submitTest'
import { useCountDown } from '../../../hook/useCountDown'
import useTestCode from '../../../hook/useTestCode'
import useUser from '../../../hook/useUser'
import { Subject } from '../../../models/subject'
import Countdown from 'react-countdown'
import {
  ResponseResult,
  SubmitAnswer,
  Test as TestModel,
} from '../../../models/test'
import { LoginResponse } from '../../../pages/Login/Login'
import { loadTest } from '../../../slice/testSlice'
import { RootState } from '../../../store'
import Loading from '../Loading'
import { IRoute } from '../router'
import Question from './Question'
import { getMark } from '../../../utils/getMark'

const { Sider, Content } = Layout
type Props = {}

interface InputCreate {
  subjectID: number
  duration: number
  date: string
  time: string
}

const Test = (props: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const [minute, second, isFinished] = countDown
  const testStore = useSelector((state: RootState) => state.test)
  const { choose, test: testList } = testStore
  const [u] = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [subject, setSubject] = useState<Subject>({
    id: 1,
    code: 1,
    date: '',
    time: '',
    name: '',
    dateTime: '',
  })
  // const countDown = useCountDown({ time: new Date(time).})
  const [input, setInput] = useState<InputCreate>()

  const [visible, setVisible] = React.useState(false)
  const [visible1, setVisible1] = React.useState(false)
  const [timeout, setTimeout] = useState<boolean>(false)
  const [result, setResult] = useState<ResponseResult>({
    total: 0,
    correct: 0,
  })

  const [testInfo] = useTestCode('code')

  useEffect(() => {
    u &&
      examApi
        .checkTest(u.id, {
          id: testInfo.id,
          date: testInfo.dateString,
        })
        .then((res) => {
          if (!res) {
            navigate(IRoute.NOT_FOUND)
          }
        })
        .catch((e) => {
          console.log(e)
        })
  }, [])

  useEffect(() => {}, [])

  // useEffect(() => {
  //   if (isFinished) {
  //     setTimeout(true)
  //   }
  // }, [isFinished])

  useEffect(() => {
    setIsLoading(true)
    examApi
      .loadTest(testInfo.id)
      .then((res) => {
        console.log(res)
        dispatch(loadTest(res.listQuestions))
        setIsLoading(false)
        setSubject({
          code: 0,
          id: res.subjectID,
          name: res.name,
          duration: res.duration,
          date: res.date,
          time: res.time,
          dateTime: res.dateTime,
        })
      })
      .catch((e) => {
        console.log(e)
        setIsLoading(false)
      })
  }, [])

  const handleSubmit = () => {
    console.log({
      studentID: (
        JSON.parse(localStorage.getItem('e-exam') as string) as LoginResponse
      ).id,
      subjectID: subject.id,
      answers: choose,
    })

    const data: SubmitAnswer = {
      // studentId: (
      //   JSON.parse(localStorage.getItem('e-exam') as string) as LoginResponse
      // ).id,
      studentId: u ? u.id : -1,
      subjectId: subject.id,
      answers: choose,
    }

    setIsLoading(true)

    const rs = getMark(choose, testList)
    console.log('grade: ' + rs.correct, '/', rs.total)

    submitTest
      .submitTest(data)
      .then((res) => {
        console.log(res)
        // navigate(IRoute.HISTORY)
        setResult({
          correct: res.correct,
          total: res.total,
        })
        setSubject({ ...subject, dateTime: '00:00:00' })
        setIsLoading(false)
        setVisible1(true)
      })
      .catch((e) => {
        console.log(e)
        setIsLoading(false)
      })
  }

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    handleSubmit()
    setVisible(false)
  }
  const handleOk1 = () => {
    setVisible1(false)
    navigate(IRoute.HISTORY)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setVisible(false)
  }
  const handleCancel1 = () => {
    console.log('Clicked cancel button')
    setVisible1(false)
  }

  const handleExit = () => {
    setTimeout(false)
    navigate(IRoute.HISTORY)
  }

  const renderer = ({ minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      return <span>Time's up!</span>
    } else {
      // Render a countdown
      return (
        <span>
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
      )
    }
  }

  if (!u) {
    return <>Vui lòng đăng nhập</>
  }
  if (
    testInfo.date.day === 0 ||
    testInfo.date.month === 0 ||
    testInfo.date.year === 0
  ) {
    return <>Đề thi không tồn tại!</>
  }

  return (
    <Layout className="test">
      <Sider className="test__sidebar">
        <div className="test__sidebar__header">
          <h5>Môn thi: {subject.name}</h5>
          <div className="exam__time">
            <h5>Ngày thi: {subject.date}</h5>
            <h5>
              Thời gian:{' '}
              {/* <span>{`${minute < 10 ? `0${minute}` : minute}:${
                second === 60 ? '00' : second < 10 ? `0${second}` : second
              }`}</span> */}
              <span>
                <Countdown
                  date={`${subject.date} ${subject.dateTime}`}
                  renderer={renderer}
                />
              </span>
            </h5>
          </div>
        </div>
        <div className="exam__question">
          {testList.map((question, index) => (
            <Button
              className={`question__item ${
                choose.findIndex((item) => item.id === question.id) > -1 &&
                choose[choose.findIndex((item) => item.id === question.id)]
                  .answer != -1
                  ? 'choosed'
                  : ''
              } ${question.flag ? 'flag' : ''}`}
              key={question.id}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        <div className="exam__submit">
          <Button type="primary" onClick={showModal}>
            Nộp bài
          </Button>
        </div>
      </Sider>
      <Content className="test__content">
        <div className="question__list">
          {testList.map((item, index) => (
            <Question
              order={index + 1}
              key={index}
              test={item}
              title={item.title}
              id={item.id}
            />
          ))}
        </div>
      </Content>
      <Modal
        title="Nộp bài thi"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc muốn nộp bài không?</p>
      </Modal>
      {timeout && (
        <div className="timeout">
          <div className="timeout__modal">
            <h3>Hết thời gian làm bài!</h3>
            <i className="bx bx-time-five"></i>
            <Button type="primary" onClick={handleExit}>
              Thoát
            </Button>
          </div>
        </div>
      )}
      <Modal
        title="Đã nộp bài thi"
        visible={visible1}
        onOk={handleOk1}
        onCancel={handleCancel1}
      >
        <p>
          Kết quả: {result.correct} / {result.total}
        </p>
      </Modal>
      {isLoading && <Loading />}
    </Layout>
  )
}

export default Test
