import React from 'react'

import {
  UseFormHandleSubmit,
  UseFormRegister,
  FieldError,
  SubmitHandler
} from 'react-hook-form'

import { ClientOnlyPortal, ImagesUpdater } from '..'

import formStyles from '@styles/components/Form.module.css'

import type { FormFields } from '@app/types/item'

interface Props {
  onSubmit: SubmitHandler<FormFields>
  register: UseFormRegister<FormFields>
  handleSubmit: UseFormHandleSubmit<FormFields>
  errors: {
    name?: FieldError | undefined
    description?: FieldError | undefined
    category?: any
    images?: any
  }
  deleteAnnounce?: () => Promise<void>
  markAsExchangedAndDelete?: () => Promise<void>
  defaultImagesValues?: string[]
}

const selectOptions = ['Any', 'Sports', 'Musical Instruments']

const ItemForm: React.FC<Props> = ({
  onSubmit,
  register,
  handleSubmit,
  errors,
  deleteAnnounce,
  markAsExchangedAndDelete,
  defaultImagesValues
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const setModalState = () => setIsModalOpen(!isModalOpen)

  return (
    <main className="container">
      {isModalOpen && (
        <ClientOnlyPortal selector="#modal">
          <ImagesUpdater setModalState={setModalState} />
        </ClientOnlyPortal>
      )}
      <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <section
          className={`${formStyles.input_container} ${formStyles.full_width}`}
        >
          <label htmlFor="name">Name</label>
          <input
            id="name"
            {...register('name', { required: 'Name is required' })}
          />
          <p className={formStyles.error}>{errors.name?.message}</p>
        </section>
        <section
          className={`${formStyles.input_container} ${formStyles.full_width}`}
        >
          <label htmlFor="description">Description</label>
          <textarea
            rows={4}
            id="description"
            {...register('description', {
              required: 'Description is required',
              minLength: {
                value: 30,
                message: 'Minimum of 30 characters'
              },
              maxLength: {
                value: 500,
                message: 'Maximum of 500 characters'
              }
            })}
          />
          <p className={formStyles.error}>{errors.description?.message}</p>
        </section>
        <section
          className={`${formStyles.input_container} ${formStyles.full_width}`}
        >
          <label htmlFor="category">Category</label>
          <select
            id="category"
            {...register('category', { required: 'Category is required' })}
          >
            {selectOptions.map((option, index) => (
              <option key={index} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </select>
        </section>
        <button type="button" onClick={setModalState}>
          Images
        </button>
        <button type="submit">Submit</button>
        {deleteAnnounce && <button type="button" onClick={deleteAnnounce}>Delete announce</button>}
        {markAsExchangedAndDelete && <button type="button" onClick={markAsExchangedAndDelete}>Mark as exchanged and delete</button>}
      </form>
    </main>
  )
}

export default ItemForm
