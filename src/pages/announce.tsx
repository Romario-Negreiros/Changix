import React from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useAuth, useFirestore } from '@utils/hooks'
import { handleErrors } from '@utils/handlers'
import { v4 as uuidv4 } from 'uuid'

import {
  ItemForm,
  Error as ErrorComponent,
  Loader,
  Success
} from '../components'

import type { NextPage } from 'next'
import type { FormFields } from '@app/types/item'
import type { UserProfile } from '@app/types/firestore'

const Announce: NextPage = () => {
  const [isLoaded, setIsLoaded] = React.useState(true)
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState(false)
  const { user } = useAuth()
  const { setDoc, updateDoc, getDoc } = useFirestore()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormFields>()

  const onSubmit: SubmitHandler<FormFields> = async data => {
    try {
      setIsLoaded(false)
      const userProfileDoc = await getDoc(['users'], user?.uid as string)
      if (!userProfileDoc.exists()) {
        throw new Error('User not found')
      }
      const itemId = uuidv4()
      await setDoc(['announced'], itemId, {
        ownerId: user?.uid,
        name: data.name,
        category: data.category,
        description: data.description
      })
      const userProfileData = userProfileDoc.data() as UserProfile
      await updateDoc(['users'], user?.uid as string, {
        announcedItems: [...userProfileData.announcedItems, itemId]
      })
      setSuccess(true)
    } catch (err) {
      handleErrors(err, 'Create Announce', setError)
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
