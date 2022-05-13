import React from 'react'

import { VerifyEmail, ResetPassword, Error } from '../components'

import { useRouter } from 'next/router'

import type { NextPage } from 'next'

const Actions: NextPage = () => {
  const { query: { mode, oobCode } } = useRouter()

  const getComponentCorrespondentToAction = () => {
    switch (mode) {
      case 'verifyEmail':
        return <VerifyEmail oobCode={oobCode as string} />
      case 'resetPassword':
        return <ResetPassword oobCode={oobCode as string} />
      default:
        return <Error title="Oooops" error="Invalid link" />
    }
  }

  return (
    <>
      {getComponentCorrespondentToAction()}
    </>
  )
}

export default Actions
