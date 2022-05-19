import React from 'react'

import { CountryCode } from 'libphonenumber-js/types'
import { User } from 'firebase/auth'

export interface Country {
  name: string
  alpha2Code: CountryCode
}

export interface SignUpFormFields {
  picture: FileList
  email: string
  name: string
  pwd: string
  confirmPwd: string
  country: string
  phoneNumber: string
}

export interface SignInFormFields extends Pick<SignUpFormFields, 'email' | 'pwd'> {}

export interface ResetPasswordFormFields {
  newPwd: string
  confirmNewPwd: string
}

export interface AuthContext {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  createUserWithEmailAndPassword: (email: string, pwd: string) => Promise<User>
  sendEmailVerification: (user: User) => Promise<void>
  signOut: () => Promise<void>
  signInWithEmailAndPassword: (email: string, pwd: string) => Promise<void>
  verifyEmailAddress: (oobCode: string) => Promise<void>
  sendPasswordResetEmail: (email: string) => Promise<void>
  confirmPasswordReset: (oobCode: string, newPwd: string) => Promise<void>
  updatePassword: (user: User, newPwd: string) => Promise<void>
  reauthenticateWithCredential: (user: User, pwd: string) => Promise<void>
  deleteUser: (user: User) => Promise<void>
}
