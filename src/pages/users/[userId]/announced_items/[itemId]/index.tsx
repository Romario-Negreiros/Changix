import React from 'react'

import { ItemForm } from '../../../../../components'

import type { NextPage } from 'next'

const submitBtn = {
  txt: 'Save changes'
}

const ManageItem: NextPage = () => {
  return (
    <main className="container">
      <ItemForm submitBtn={submitBtn} modalBtnTxt="Update images" />
    </main>
  )
}

export default ManageItem
