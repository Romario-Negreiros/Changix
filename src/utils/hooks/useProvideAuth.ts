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

  const sendEmailVerification = async (user: User) => {
    await firebase.auth.sendEmailVerification(user)
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

  const sendPasswordResetEmail = async (email: string) => {
    await firebase.auth.sendPasswordResetEmail(firebase.auth.instance, email)
  }

  const confirmPasswordReset = async (oobCode: string, newPwd: string) => {
    await firebase.auth.confirmPasswordReset(
      firebase.auth.instance,
      oobCode,
      newPwd
    )
  }

  const updatePassword = async (user: User, newPwd: string) => {
    await firebase.auth.updatePassword(user, newPwd)
  }

  const reauthenticateWithCredential = async (user: User, pwd: string) => {
    const credential = firebase.auth.EmailAuthProvider.credential(user.email as string, pwd)
    await firebase.auth.reauthenticateWithCredential(user, credential)
  }

  return {
    user,
    setUser,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    signInWithEmailAndPassword,
    verifyEmailAddress,
    sendPasswordResetEmail,
    confirmPasswordReset,
    updatePassword,
    reauthenticateWithCredential
  }
}

export default useProvideAuth
