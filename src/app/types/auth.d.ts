import React from 'react'

import { CountryCode } from 'libphonenumber-js/types'
import { User } from 'firebase/auth'

export interface Country {
  name: string;
  alpha2Code: CountryCode;
}

export interface FormFields {
  picture: FileList;
  email: string;
  name: string;
  pwd: string;
  confirmPwd: string;
  country: string;
  phoneNumber: string;
}

export interface UserProfile extends Omit<FormFields, 'email' | 'pwd' | 'confirmPwd'> {
}

export interface AuthContext {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  createUserWithEmailAndPassword: (email: string, pwd: string) => Promise<User>
  sendEmailVerification: (user: User | null) => Promise<void>
}
