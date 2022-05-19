import React from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useAuth, useFirestore } from '@utils/hooks'
import { v4 as uuidv4 } from 'uuid'

import {
  ItemForm,
  Error as ErrorComponent,
  Loader,
  Success
} from '../components'

import type { NextPage } from 'next'
import type { FormFields } from '@app/types/item'

const Announce: NextPage = () => {
  const [isLoaded, setIsLoaded] = React.useState(true)
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState(false)
  const { user } = useAuth()
  const { setDoc } = useFirestore()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormFields>()

  const onSubmit: SubmitHandler<FormFields> = async data => {
    try {
      setIsLoaded(false)
      const itemId = uuidv4()
      await setDoc(['announced'], itemId, {
        ownerId: user?.uid,
        ...data
      })
      setSuccess(true)
    } catch (err) {
      if (err instanceof Error) setError(err.message)
    } finally {
      setIsLoaded(true)
    }
  }

  if (!isLoaded) {
    return <Loader />
  } else if (error) {
    return (
      <ErrorComponent
        title="Oooops"
        error={error}
        btn={{ handleClick: () => setError(''), text: 'Dismiss' }}
      />
    )
  } else if (success) {
    return (
      <Success
        title="Announce succesfully completed!"
        redirect={{
          page: 'your announces',
          url: `/users/${user?.uid}/announced_items`
        }}
      />
    )
  }
  return (
    <ItemForm
      onSubmit={onSubmit}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
    />
  )
}

export default Announce
