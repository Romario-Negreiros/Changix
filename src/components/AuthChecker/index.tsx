import React from 'react'

import { useRouter } from 'next/router'

import { User } from 'firebase/auth'
import Error from '../Error'

interface Props {
  children: React.ReactNode
  user: User | null
}

const forbiddenPaths = [
  '/announce'
]

const AuthChecker: React.FC<Props> = ({ children, user }) => {
  const { pathname, push } = useRouter()

  if (!forbiddenPaths.includes(pathname)) {
    return <>{children}</>
  } else if (!user) {
    return (
      <Error
        title="Oooops"
        error="You need to be logged in to access this page!"
        btn={{ handleClick: () => push('/sign_in'), text: 'Sign In Now' }}
      />
    )
  } else if (!user.emailVerified) {
    return (
      <Error
        title="Oooops"
        error="You need to verify your email address to access this page!"
      />
    )
  }
  return <>{children}</>
}

export default AuthChecker
