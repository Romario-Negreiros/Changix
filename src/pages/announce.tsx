import React from 'react'

import { ItemForm } from '../components'

import type { NextPage } from 'next'

const submitBtn = {
  txt: 'Submit'
}

const Announce: NextPage = () => {
  return (
    <main className="container">
      <ItemForm submitBtn={submitBtn} modalBtnTxt="Add images" />
    </main>
  )
}

export default Announce
