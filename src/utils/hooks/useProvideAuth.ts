import React from 'react'

import firebase from '@app/lib/firebase'

import { User } from 'firebase/auth'
import type { AuthContext as Response } from '@app/types/auth'

const useProvideAuth = (): Response => {
  const [user, setUser] = React.useState<User | null>(null)

  const createUserWithEmailAndPassword = async (email: string, pwd: string) => {
    const { user } = await firebase.auth.createUserWithEmailAndPassword(
      firebase.auth.instance,
      email,
      pwd
    )
    return user
  }

  const sendEmailVerification = async (user: User | null) => {
    if (user) {
      await firebase.auth.sendEmailVerification(user)
    } else throw new Error('homer')
  }

  const signOut = async () => {
    await firebase.auth.instance.signOut()
  }

  const signInWithEmailAndPassword = async (email: string, pwd: string) => {
    await firebase.auth.signInWithEmailAndPassword(
      firebase.auth.instance,
      email,
      pwd
    )
  }

  const verifyEmailAddress = async (oobCode: string) => {
    await firebase.auth.applyActionCode(firebase.auth.instance, oobCode)
  }

  return {
    user,
    setUser,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    signInWithEmailAndPassword,
    verifyEmailAddress
  }
}

export default useProvideAuth
