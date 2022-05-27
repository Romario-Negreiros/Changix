import React from 'react'

import { useRouter } from 'next/router'
import { handleErrors } from '@utils/handlers'
import { useAuth } from '@utils/hooks'

import { Error as ErrorComponent, Loader, Success } from '..'

interface Props {
  oobCode: string
}

const VerifyEmail: React.FC<Props> = ({ oobCode }) => {
  const [error, setError] = React.useState('')
  const [hasVerified, setHasVerified] = React.useState(false)
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
          handleErrors(err, 'Verify email', setError)
        }
      })()
    }
  }, [hasVerified, user, push, verifyEmailAddress, oobCode, signOut])

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
      <Success
        title="Email succesfully verified!"
        redirect={{ url: '/sign_in', page: 'sign in' }}
      />
    )
  }
  return <Loader />
}

export default VerifyEmail
