import React, { useEffect, useState } from 'react'
import { Button, Layout, Modal, Pagination } from 'antd'
import Question from './Question'
import { Test as TestModel } from '../../../models/test'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { loadTest } from '../../../slice/testSlice'
import { useCountDown } from '../../../hook/useCountDown'

const { Header, Footer, Sider, Content } = Layout
type Props = {}

const Test = (props: Props) => {
  const dispatch = useDispatch()
  const countDown = useCountDown({ time: 1 })
  const [minute, second, isFinished] = countDown
  const testStore = useSelector((state: RootState) => state.test)
  const { choose, test: testList } = testStore

  const [visible, setVisible] = React.useState(false)
  const [timeout, setTimeout] = useState<boolean>(false)

  useEffect(() => {
    if (isFinished) {
      setTimeout(true)
    }
  }, [isFinished])
  useEffect(() => {
    const test: TestModel = [
      {
        id: 1,
        title: 'Công nghệ phần mềm là gì?',
        answers: [
          {
            id: 1,
            title: 'Data Analytics',
          },
          {
            id: 2,
            title: 'Database Design',
          },
          {
            id: 3,
            title: 'Software Engineering',
          },
          {
            id: 4,
            title: 'Business Analytics',
          },
        ],
        correct: [1],
        choose: [-1],
        flag: false,
        status: 0,
      },
      {
        id: 2,
        title: 'Công nghệ thông tin là gì? sdf',
        answers: [
          {
            id: 1,
            title: 'Data Analytics',
          },
          {
            id: 2,
            title: 'Database Design',
          },
          {
            id: 3,
            title: 'Software Engineering',
          },
          {
            id: 4,
            title: 'Business Analytics',
          },
        ],
        correct: [1],
        choose: [-1],
        flag: false,
        status: 0,
      },
      {
        id: 3,
        title: 'Công nghệ thông tin là gì?',
        answers: [
          {
            id: 1,
            title: 'Data Analytics',
          },
          {
            id: 2,
            title: 'Database Design',
          },
          {
            id: 3,
            title: 'Software Engineering',
          },
          {
            id: 4,
            title: 'Business Analytics',
          },
        ],
        correct: [1, 2],
        choose: [-1],
        flag: false,
        status: 0,
      },
      {
        id: 4,
        title: 'Công nghệ thông tin là gì?',
        answers: [
          {
            id: 1,
            title: 'Data Analytics',
          },
          {
            id: 2,
            title: 'Database Design',
          },
          {
            id: 3,
            title: 'Software Engineering',
          },
          {
            id: 4,
            title: 'Business Analytics',
          },
        ],
        correct: [1],
        choose: [-1],
        flag: false,
        status: 0,
      },
      {
        id: 5,
        title: 'Công nghệ thông tin là gì?',
        answers: [
          {
            id: 1,
            title: 'Data Analytics',
          },
          {
            id: 2,
            title: 'Database Design',
          },
          {
            id: 3,
            title: 'Software Engineering',
          },
          {
            id: 4,
            title: 'Business Analytics',
          },
        ],
        correct: [1],
        choose: [-1],
        flag: false,
        status: 0,
      },
      {
        id: 6,
        title: 'Công nghệ thông tin là gì?',
        answers: [
          {
            id: 1,
            title: 'Data Analytics',
          },
          {
            id: 2,
            title: 'Database Design',
          },
          {
            id: 3,
            title: 'Software Engineering',
          },
          {
            id: 4,
            title: 'Business Analytics',
          },
        ],
        correct: [1],
        choose: [-1],
        flag: false,
        status: 0,
      },
    ]
    dispatch(loadTest(test))
  }, [])

  const handleSubmit = () => {}

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    setVisible(false)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setVisible(false)
  }

  const handleExit = () => {
    setTimeout(false)
  }

  return (
    <Layout className="test">
      <Sider className="test__sidebar">
        <div className="test__sidebar__header">
          <h5>Môn thi: Nhập môn CNPM</h5>
          <div className="exam__time">
            <h5>Ngày thi: 20/5/2022</h5>
            <h5>
              Thời gian:{' '}
              <span>{`${minute < 10 ? `0${minute}` : minute}:${
                second === 60 ? '00' : second < 10 ? `0${second}` : second
              }`}</span>
            </h5>
          </div>
        </div>
        <div className="exam__question">
          {testList.map((question, index) => (
            <Button
              className={`question__item ${
                choose.findIndex((item) => item.id === question.id) > -1 &&
                choose[choose.findIndex((item) => item.id === question.id)]
                  .answer.length > 0
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
    </Layout>
  )
}

export default Test
