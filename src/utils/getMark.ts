import { Question } from '../models/test'
import { ChooseAnswer } from '../slice/testSlice'

export const getMark = (chooses: ChooseAnswer[], answers: Question[]) => {
  const rs: any = {
    correct: 0,
    total: answers.length,
  }

  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i]
    for (let j = 0; j < chooses.length; j++) {
      const choose = chooses[j]

      if (choose.id === answer.id) {
        if (
          chooses.findIndex((item) => item.id === choose.id) ===
          answer.correct - 1
        ) {
          console.log('right!')
        }
      }
    }
  }

  return rs
}
