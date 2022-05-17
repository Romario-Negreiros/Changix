import { FieldPath, WhereFilterOp } from 'firebase/firestore'

import type { SignUpFormFields } from './auth'

export type WhereArgs = [
  fieldPath: string | FieldPath,
  opStr: WhereFilterOp,
  value: unknown
]

export interface UserProfile
  extends Omit<SignUpFormFields, 'email' | 'pwd' | 'confirmPwd'> {}
