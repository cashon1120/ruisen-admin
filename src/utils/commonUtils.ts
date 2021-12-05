import moment from 'moment'
// 防抖
export const debouncing = (fn: Function, delay: number) => {
  let timer: any = null
  return function (this: any) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

// 节流
export const throttle = (fn: Function, delay: number) => {
  let pre = Date.now()
  return function (this: any) {
    if (Date.now() - pre >= delay) {
      fn.apply(this, arguments)
      pre = Date.now()
    }
  }
}

export const getTimeStrByStamp = (timeStamp: string, format: string) => {
  const momentTime: any = moment(moment(parseInt(timeStamp) * 1000).format(format), format)
  if (momentTime._i === 'Invalid date') {
    return false
  }
  return momentTime
}

export const getTimeStrByStampms = (timeStamp: string, format: string) => {
  const momentTime: any = moment(moment(parseInt(timeStamp)).format(format), format)
  if (momentTime._i === 'Invalid date') {
    return false
  }
  return momentTime
}
