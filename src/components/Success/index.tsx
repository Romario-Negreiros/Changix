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
}

const Success: React.FC<Props> = ({ title, message, redirect }) => {
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
    <main className="container">
      <div className={styles.wrapper}>
        <h1>{title}</h1>
        <p>
          {message || `Redirecting you to ${redirect?.page} page in ${redirectTimer} seconds`}
        </p>
      </div>
    </main>
  )
}

export default Success
