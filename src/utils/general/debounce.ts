const debounce = (func: (...args: any[]) => any, timeout: number = 500) => {
  let timer: NodeJS.Timeout | undefined

  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args as [])
    }, timeout)
  }
}

export default debounce
