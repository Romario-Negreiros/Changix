const throttle = (func: (...args: any[]) => any, wait = 500) => {
  let lastTime = 0

  return (...args: any[]) => {
    const now = Date.now()
    if (now - lastTime >= wait) {
      func(args)
      lastTime = now
    }
  }
}

export default throttle
