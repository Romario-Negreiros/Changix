import React from 'react'

import { VerifyEmailMessage } from '../components'

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
      <VerifyEmailMessage /> {/* VerfiyEmailMessage = 2 */}
    </main>
  )
}

export default SignUp
