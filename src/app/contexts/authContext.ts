import React from 'react'

import type { AuthContext } from '@app/types/auth'
import { User } from 'firebase/auth'

const initialValue = {
  user: null,
  setUser: () => {},
  createUserWithEmailAndPassword: async () => {
    const user = {}
    return user as User
  },
  sendEmailVerification: async () => {}
}

const authContext = React.createContext<AuthContext>(initialValue)

export default authContext
