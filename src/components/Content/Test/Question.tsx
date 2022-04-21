import { Button } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Question as QuestionModel, Test } from '../../../models/test'
import { chooseAnswer, flagQuestion } from '../../../slice/testSlice'

interface Props {
  order: number
  test: QuestionModel
  id: number
  title: string
}

const Question = ({ order, test, id, title }: Props) => {
  const dispatch = useDispatch()
  const [answer, setAnswer] = useState<number[]>([])

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)

    let list: number[] = []
    if (test.correct.length > 1) {
      if (answer.includes(value)) {
        list = [...answer.filter((item) => item === value)]
        setAnswer(list)
      } else {
        list = [...answer, value]
        setAnswer(list)
      }
    } else {
      list = [value]
      setAnswer(list)
    }
    dispatch(
      chooseAnswer({
        id,
        answer: list,
      })
    )
  }
  return (
    <div className="question__list__item" id={`quest-${id}`}>
      <div className="question__title">
        Câu {order}: <span>{test.title}</span>
        <Button onClick={() => dispatch(flagQuestion(id))}>
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
