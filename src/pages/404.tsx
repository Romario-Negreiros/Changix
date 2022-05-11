import React from 'react'

import { Error } from '../components'

import { useRouter } from 'next/router'

import _404Animation from '@public/animations/404.json'

import type { NextPage } from 'next'

const _404: NextPage = () => {
  const router = useRouter()

  const btn = {
    handleClick: () => {
      router.back()
    },
    text: 'Go back'
  }

  return (
    <Error
      title="Page not found... 🔍"
      error="You might have misspelled something in the url, or attempted to visit
  a page which was deleted."
      animation={_404Animation}
      btn={btn}
    />
  )
}

export default _404
