const throttle = (func: (...args: any[]) => any, wait: number, isScrollQuery?: boolean) => {
  let lastTime = 0

  return (...args: any[]) => {
    const now = Date.now()
    if (isScrollQuery) {
      const documentHeight = document.body.scrollHeight
      const currentScroll = window.scrollY + window.innerHeight
      if (currentScroll === documentHeight) {
        func(args)
        lastTime = now
      } else if (now - lastTime >= wait) {
        func(args)
        lastTime = now
      }
    }
    if (now - lastTime >= wait) {
      func(args)
      lastTime = now
    }
  }
}

export default throttle
