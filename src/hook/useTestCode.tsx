import React from 'react'
import { sys } from 'typescript'
import { DateTime, TestCode } from '../models/test'
import useQuery from './useQuery'

interface Props {
  code: string
}
const getDateFromString = (date: string): DateTime => {
  try {
    const dates = date.split('')
    const year = Number(dates.slice(0, 4).join('').toString())
    const month = Number(dates.slice(4, 6).join('').toString())
    const day = Number(dates.slice(6, 8).join('').toString())
    return {
      day,
      month,
      year,
    }
  } catch (error) {
    return {
      day: 0,
      month: 0,
      year: 0,
    }
  }
}
const useTestCode = (code: string) => {
  const testCode = useQuery().get(code)
  const testInfo = testCode ? testCode.split('/') : []
  const subjectId = testInfo[0]
  const testDate = getDateFromString(testInfo[1])
  console.log(testInfo)
  const data: TestCode = {
    id: Number(subjectId),
    date: {
      day: testDate.day,
      month: testDate.month,
      year: testDate.year,
    },
  }
  return [data]
}

export default useTestCode
