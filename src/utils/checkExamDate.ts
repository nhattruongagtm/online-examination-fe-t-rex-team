export const checkExamDate = (date: string, time: string, duration: number) => {
  const examDate = Date.parse(date)
  const expireDateTime = new Date(date + ' ' + time)
  expireDateTime.setMinutes(expireDateTime.getMinutes() + duration)
  // const expireTime = expireDateTime.toString().split(' ')[4]
  const expireDate = Date.parse(expireDateTime.toString())

  const yearNow = new Date().getFullYear()
  const monthNow = new Date().getMonth() + 1
  const dayNow = new Date().getDate()
  const now = Date.parse(
    `${yearNow}-${monthNow < 10 ? `0${monthNow}` : monthNow}-${
      dayNow < 10 ? `0${dayNow}` : dayNow
    }`
  )
  console.log(now)
  console.log(examDate)
  console.log(expireDate)
  if (now >= examDate && now <= expireDate) {
    return true
  }
  return false
}

export const excludeDate = (date: string) => {
  let rs = ''
  const dates = date.split('-')
  dates.forEach((item) => {
    rs += item
  })
  return rs
}
