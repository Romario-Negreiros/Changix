import React from 'react'

import { ClientOnlyPortal, ImagesUpdater } from '../../../../../components'

import formStyles from '@styles/components/Form.module.css'

import type { NextPage } from 'next'

const ManageItem: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const setModalState = () => setIsModalOpen(!isModalOpen)

  return (
    <main className="container">
      {isModalOpen && (
        <ClientOnlyPortal selector="#modal">
          <ImagesUpdater setModalState={setModalState}/>
        </ClientOnlyPortal>
      )}
      <form className={formStyles.form}>
        <section
          className={`${formStyles.input_container} ${formStyles.full_width}`}
        >
          <label htmlFor="name">Name</label>
          <input id="name" />
        </section>
        <section
          className={`${formStyles.input_container} ${formStyles.full_width}`}
        >
          <label htmlFor="description">Description</label>
          <textarea rows={4} id="description" />
        </section>
        <section
          className={`${formStyles.input_container} ${formStyles.full_width}`}
        >
          <p className={formStyles.label_fallback}>Categories</p>
          <div className={formStyles.checkbox_wrapper}>
            <input type="checkbox" id="sports" />
            <label htmlFor="sports">Sports</label>
          </div>
          <div className={formStyles.checkbox_wrapper}>
            <input type="checkbox" id="musical_intruments" />
            <label htmlFor="musical_instruments">Musical Instruments</label>
          </div>
          <div className={formStyles.checkbox_wrapper}>
            <input type="checkbox" id="musical_intruments" />
            <label htmlFor="musical_instruments">Musical Instruments</label>
          </div>
          <div className={formStyles.checkbox_wrapper}>
            <input type="checkbox" id="musical_intruments" />
            <label htmlFor="musical_instruments">Musical Instruments</label>
          </div>
          <div className={formStyles.checkbox_wrapper}>
            <input type="checkbox" id="musical_intruments" />
            <label htmlFor="musical_instruments">Musical Instruments</label>
          </div>
          <div className={formStyles.checkbox_wrapper}>
            <input type="checkbox" id="musical_intruments" />
            <label htmlFor="musical_instruments">Musical Instruments</label>
          </div>
        </section>
        <button type="submit">Save changes</button>
        <button type="button" onClick={setModalState}>
          Update images
        </button>
      </form>
    </main>
  )
}

export default ManageItem
