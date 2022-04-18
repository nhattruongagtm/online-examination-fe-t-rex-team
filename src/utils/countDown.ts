export const countDown = (time: number, callback: Function) => {
  // time is minute unit
  let minute = Math.floor(time)
  let second = 60
  setInterval(() => {
    if (minute > 0) {
      minute--
    }
    console.log(minute)
  }, Math.floor(60 * 1000))
  setInterval(() => {
    if (second <= 60 && second > 0) {
      second--
    } else {
      second = 60
    }
    console.log(second)
  }, 1000)
}
