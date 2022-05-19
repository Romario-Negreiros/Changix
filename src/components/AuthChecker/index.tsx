import React from 'react'

import { useRouter } from 'next/router'

import { User } from 'firebase/auth'
import Error from '../Error'

interface Props {
  children: React.ReactNode
  user: User | null
}

const forbiddenPaths = [
  '/users/[userId]',
  '/users/[userId]/announced_items',
  '/users/[userId]/announced_items/[itemId]',
  '/items/[itemId]',
  '/announce'
]

const AuthChecker: React.FC<Props> = ({ children, user }) => {
  const { pathname, push } = useRouter()

  if (!forbiddenPaths.includes(pathname) || user) {
    return <>{children}</>
  }
  return (
    <Error
      title="Oooops"
      error="You need to be logged in to access this page!"
      btn={{ handleClick: () => push('/sign_in'), text: 'Sign In Now' }}
    />
  )
}

export default AuthChecker
