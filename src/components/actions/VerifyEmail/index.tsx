import React from 'react'

import styles from '@styles/components/VerifyEmail.module.css'

import { useRouter } from 'next/router'
import { useAuth } from '@utils/hooks'

import { Error as ErrorComponent, Loader } from '../../'

interface Props {
  oobCode: string
}

const VerifyEmail: React.FC<Props> = ({ oobCode }) => {
  const [error, setError] = React.useState('')
  const [hasVerified, setHasVerified] = React.useState(false)
  const [redirectTimer, setRedirectTimer] = React.useState(5)
  const { user, signOut, verifyEmailAddress } = useAuth()
  const { push } = useRouter()

  React.useEffect(() => {
    if (!hasVerified && user) {
      ;(async () => {
        try {
          await signOut()
          await verifyEmailAddress(oobCode)
          setHasVerified(true)
        } catch (err) {
          if (err instanceof Error) setError(err.message)
        }
      })()
    } else {
      setTimeout(() => setRedirectTimer(redirectTimer - 1), 1000)
      if (redirectTimer === 0) push('/sign_in')
    }
  }, [
    hasVerified,
    user,
    redirectTimer,
    push,
    verifyEmailAddress,
    oobCode,
    signOut
  ])

  if (error) {
    return (
      <ErrorComponent
        title="Oooops"
        error={error}
        btn={{ handleClick: () => push('/sign_up'), text: 'Go to sign up' }}
      />
    )
  } else if (hasVerified) {
    return (
      <main className="container">
        <div className={styles.wrapper}>
          <h1>Email succesfully verified!</h1>
          <p>Redirecting you to sign in page in {redirectTimer} seconds</p>
        </div>
      </main>
    )
  }
  return <Loader />
}

export default VerifyEmail
