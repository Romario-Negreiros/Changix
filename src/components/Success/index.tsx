import React from 'react'

import { useRouter } from 'next/router'

import styles from '@styles/components/Success.module.css'

interface Props {
  title: string
  message?: string
  redirect?: {
    url: string
    page: string
  }
  isModal?: boolean
}

const Success: React.FC<Props> = ({ title, message, redirect, isModal }) => {
  const [redirectTimer, setRedirectTimer] = React.useState(5)
  const { push } = useRouter()

  React.useEffect(() => {
    if (redirect) {
      if (redirectTimer === 0) {
        push(redirect?.url)
      }
      setTimeout(() => setRedirectTimer(redirectTimer - 1), 1000)
    }
  }, [redirectTimer, push, redirect])

  return (
    <main className={isModal ? 'modal_container' : 'container'}>
      <div className={`${styles.wrapper} ${isModal && styles.wrapperInModal}`}>
        <h1>{title}</h1>
        <p>
          {message || `Redirecting you to ${redirect?.page} page in ${redirectTimer} seconds`}
        </p>
      </div>
    </main>
  )
}

export default Success
