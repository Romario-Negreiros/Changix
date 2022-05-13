import React from 'react'

import { ClientOnlyPortal, ImagesUpdater } from '..'

import formStyles from '@styles/components/Form.module.css'

import type { SubmitBtn, ItemFormFields } from '@app/types/item'

interface Props {
  submitBtn: SubmitBtn
  modalBtnTxt: string
  defaultValues?: ItemFormFields;

}

const ItemForm: React.FC<Props> = ({ submitBtn, modalBtnTxt, defaultValues }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const setModalState = () => setIsModalOpen(!isModalOpen)

  return (
    <main className="container">
      {isModalOpen && (
        <ClientOnlyPortal selector="#modal">
          <ImagesUpdater setModalState={setModalState} />
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
        </section>
        <button type="button" onClick={setModalState}>
          {modalBtnTxt}
        </button>
        <button type="submit" onClick={submitBtn.onClick}>
          {submitBtn.txt}
        </button>
      </form>
    </main>
  )
}

export default ItemForm
