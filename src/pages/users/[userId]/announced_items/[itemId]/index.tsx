import React from 'react'

import formStyles from '@styles/Form.module.css'

import type { NextPage } from 'next'

const ManageItem: NextPage = () => {
  return (
    <main className="container">
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
        <button type="button">Update images</button>
      </form>
    </main>
  )
}

export default ManageItem
