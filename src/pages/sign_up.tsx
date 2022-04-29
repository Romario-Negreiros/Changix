import React from 'react'

import { GetEmail } from '../components'

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
      <GetEmail />
    </main>
  )
}

export default SignUp
