import React from 'react'

import { Error } from '../components'

import { useRouter } from 'next/router'

import type { NextPage } from 'next'

const _500: NextPage = () => {
  const router = useRouter()

  const btn = {
    handleClick: () => {
      router.back()
    },
    text: 'Go back'
  }

  return (
    <Error
      title="Calm down, please... 😰"
      error="An error occured while trying to complete the action, please go back
      and try again!"
      btn={btn}
    />
  )
}

export default _500
