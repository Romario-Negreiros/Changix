import React from 'react'

import { Form } from '../components'

import type { NextPage } from 'next'

const SignUp: NextPage = () => {
  return (
    <main className="sign_pages_container">
      {/* GetEmail = 1 */}
      {/* VerfiyEmailMessage = 2 */}
      <Form />
    </main>
  )
}

export default SignUp
