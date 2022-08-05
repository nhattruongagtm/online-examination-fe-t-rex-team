import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Question as QuestionModel, Test } from '../../../models/test'
import {
  chooseAnswer,
  flagQuestion,
  loadPosition,
} from '../../../slice/testSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
interface Props {
  order: number
  test: QuestionModel
  id: number
  title: string
}

const Question = ({ order, test, id, title }: Props) => {
  const dispatch = useDispatch()
  const [answer, setAnswer] = useState<number>(-1)
  const testState = useSelector((state: RootState) => state.test)

  const { test: testSlice, currentQuestion } = testState

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)

    // if (test.correct > 1) {
    //   if (answer.includes(value)) {
    //     list = [...answer.filter((item) => item === value)]
    //     setAnswer(list)
    //   } else {
    //     list = [...answer, value]
    //     setAnswer(list)
    //   }
    // } else {
    //   list = [value]
    setAnswer(value)

    dispatch(
      chooseAnswer({
        id,
        answer: value,
      })
    )
  }

  useEffect(() => {
    const pos = document.getElementById(`quest-${id}`)
    if (pos) {
      if (currentQuestion === order) {
        dispatch(loadPosition(pos.offsetTop))
      }
    }
  }, [currentQuestion])

  return (
    <div className="question__list__item" id={`quest-${id}`}>
      <div className="question__title">
        <span>
          {' '}
          Question {order}: {test.title}
        </span>
        <Button
          onClick={() => dispatch(flagQuestion(id))}
          danger={testSlice[order - 1].flag}
          type={testSlice[order - 1].flag ? 'primary' : 'dashed'}
        >
          <i className="bx bxs-flag"></i>
        </Button>
      </div>
      <ul className="question__answers">
        {test.answers.map((item) => (
          <li key={item.id}>
            <input
              type="radio"
              name={id.toString()}
              id={`${title}-${item.id}-${item.title}`}
              value={item.id}
              onChange={handleChangeRadio}
            />
            <label htmlFor={`${title}-${item.id}-${item.title}`}>
              <span>{item.title}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Question
