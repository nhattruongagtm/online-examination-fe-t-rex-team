export const checkExamDate = (date: string, duration: number) => {
  const examDate = Date.parse(date)
  const yearNow = new Date().getFullYear()
  const monthNow = new Date().getMonth() + 1
  const dayNow = new Date().getDate()
  const now = Date.parse(
    `${yearNow}-${monthNow < 10 ? `0${monthNow}` : monthNow}-${
      dayNow < 10 ? `0${dayNow}` : dayNow
    }`
  )
  if (now >= examDate && now < examDate + duration) {
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
