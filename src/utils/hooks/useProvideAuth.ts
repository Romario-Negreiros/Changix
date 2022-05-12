import React from 'react'

import firebase from '@app/lib/firebase'

import { User } from 'firebase/auth'
import type { AuthContext as Response } from '@app/types/auth'

const useProvideAuth = (): Response => {
  const [user, setUser] = React.useState<User | null>(null)

  const createUserWithEmailAndPassword = async (email: string, pwd: string) => {
    const { user } = await firebase.auth.createUserWithEmailAndPassword(firebase.auth.instance, email, pwd)
    return user
  }

  const sendEmailVerification = async (user: User | null) => {
    if (user) {
      await firebase.auth.sendEmailVerification(user)
    } else throw new Error('homer')
  }

  return {
    user,
    setUser,
    createUserWithEmailAndPassword,
    sendEmailVerification
  }
}

export default useProvideAuth
