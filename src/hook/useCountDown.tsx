import React, { useEffect } from 'react'
import { useState } from 'react'
type Props = {
  time: number
}

export const useCountDown = ({ time }: Props) => {
  const [minute, setMinute] = useState<number>(time)
  const [second, setSecond] = useState<number>(60)
  const [isFinished, setIsFinished] = useState<boolean>(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMinute(minute - 1)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      ;(minute > 0 || second > 0) &&
        setSecond(second <= 60 && second > 0 ? second - 1 : 59)
    }, 1000)

    if (second === 1) {
      setMinute(minute > 1 ? minute - 1 : 0)
    }

    return () => {
      clearInterval(interval)
    }
  }, [second])

  useEffect(() => {
    if (minute === 0 && second === 0) {
      setIsFinished(true)
    }
  }, [minute, second])

  return [minute, second, isFinished]
}
