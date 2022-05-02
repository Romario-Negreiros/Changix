import React from 'react'

import { Form } from '../components'

import type { NextPage } from 'next'

const containerStyles = {
  display: 'grid',
  placeItems: 'center',
  height: 'calc(100vh - 60px)',
  padding: '3rem 2rem'
}

const SignUp: NextPage = () => {
  return (
    <main style={containerStyles}>
      {/* GetEmail = 1 */}
      {/* VerfiyEmailMessage = 2 */}
      <Form />
    </main>
  )
}

export default SignUp
