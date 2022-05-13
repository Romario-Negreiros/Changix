import React from 'react'

import { VerifyEmail } from '../components'

import { useRouter } from 'next/router'

import type { NextPage } from 'next'

const Actions: NextPage = () => {
  const { query: { mode, oobCode } } = useRouter()

  const getComponentCorrespondentToAction = () => {
    switch (mode) {
      case 'verifyEmail':
        return <VerifyEmail oobCode={oobCode as string} />
      case 'resetPassword':
        return <main></main>
      default:
        return <main></main>
    }
  }

  return (
    <>
      {getComponentCorrespondentToAction()}
    </>
  )
}

export default Actions
