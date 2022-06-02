import React from 'react'

import { useFirestore, useAuth, useStorage } from '@utils/hooks'
import { handleErrors } from '@utils/handlers'
import { getAllImagesInAnArray } from '@utils/general'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'

import {
  ItemForm,
  Error as ErrorComponent,
  Loader
} from '../../../../../components'

import type { GetServerSideProps, NextPage } from 'next'
import type { Item, FormFields } from '@app/types/item'
import { UserProfile } from '@app/types/firestore'

interface Props {
  item: Item
  serverSideError?: string
}

export const getServerSideProps: GetServerSideProps = async context => {
  const itemId = context.params?.itemId
  if (!itemId) {
    return {
      props: {
        serverSideError: 'Invalid id!'
      }
    }
  }

  const firestoreFunctions = useFirestore
  const { getDoc } = firestoreFunctions()

  const item = await getDoc(['announced'], itemId as string)
  if (!item.exists()) {
    return {
      props: {
        serverSideError: 'Item not found!'
      }
    }
  }

  return {
    props: {
      item: {
        id: itemId,
        ...item.data()
      }
    }
  }
}

const ManageItem: NextPage<Props> = ({ item, serverSideError }) => {
  const [isLoaded, setIsLoaded] = React.useState(true)
  const [error, setError] = React.useState('')
  const [imagesPreviews, setImagesPreviews] = React.useState<any>({})
  const [hasRun, setHasRun] = React.useState(false)
  const { user } = useAuth()
  const { updateDoc, getDoc, deleteDoc } = useFirestore()
  const { uploadImages, deleteImages } = useStorage()
  const { back } = useRouter()
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors }
  } = useForm<FormFields>({
    defaultValues: {
      name: item.name,
      category: item.category,
      description: item.description
    }
  })

  React.useEffect(() => {
    if (item.images && !hasRun) {
      item.images.forEach((img, index) => {
        if (!imagesPreviews[`image${index}`]) {
          setImagesPreviews((oldImagesPreviews: any) => {
            return {
              ...oldImagesPreviews,
              [`image${index}`]: img
            }
          })
        }
      })
      setHasRun(true)
    }
  }, [item.images, imagesPreviews, hasRun])

  const onSubmit: SubmitHandler<FormFields> = async data => {
    try {
      setIsLoaded(false)
      const userProfileDoc = await getDoc(['users'], user?.uid as string)
      if (!userProfileDoc.exists()) {
        throw new Error('User not found')
      }
      let urls: (string | undefined)[] = []
      const images = getAllImagesInAnArray(data, true)
      if (images.length) {
        urls = await uploadImages([...images], ['items', item.id], true)
      }
      const filteredUrls: string[] = []
      urls.forEach((url, index) => {
        if (
          item.images[index] === imagesPreviews[`image${index}`] &&
          item.images[index] !== undefined &&
          !url
        ) {
          filteredUrls.push(item.images[index])
        } else if (url) {
          filteredUrls.push(url)
        }
      })
      await updateDoc(['announced'], item.id, {
        name: data.name,
        images: filteredUrls,
        category: data.category,
        description: data.description
      })
      back()
    } catch (err) {
      handleErrors(err, 'Update Annouce Information', setError)
      setIsLoaded(true)
    }
  }

  const updateUserProfile = async (exchanged?: boolean) => {
    const userProfileDoc = await getDoc(['users'], user?.uid as string)
    if (!userProfileDoc.exists()) {
      throw new Error('User not found')
    }
    const userProfileData = userProfileDoc.data() as UserProfile
    const updatedAnnouncedItems = userProfileData.announcedItems.filter(
      aItem => {
        if (aItem !== item.id) {
          return aItem
        } else return undefined
      }
    )
    await updateDoc(['users'], user?.uid as string, {
      announcedItems: updatedAnnouncedItems,
      exchangedItems: exchanged
        ? userProfileData.exchangedItems + 1
        : userProfileData.exchangedItems
    })
  }

  const deleteAnnounce = async () => {
    try {
      setIsLoaded(false)
      await deleteImages(item.images, ['items', item.id])
      await deleteDoc(['announced'], item.id)
      await updateUserProfile()
      back()
    } catch (err) {
      handleErrors(err, 'Delete Announce', setError)
      setIsLoaded(true)
    }
  }

  const markAsItemExchangedAndDelete = async () => {
    try {
      setIsLoaded(false)
      await deleteImages(item.images, ['items', item.id])
      await deleteDoc(['announced'], item.id)
      await updateUserProfile(true)
      back()
    } catch (err) {
      handleErrors(err, 'Mark Announce As Exchanged And Delete', setError)
      setIsLoaded(true)
    }
  }

  if (!isLoaded) {
    return <Loader />
  } else if (serverSideError) {
    return (
      <ErrorComponent
        title="Oooops"
        error={serverSideError}
        btn={{ handleClick: () => back(), text: 'Go back' }}
      />
    )
  } else if (error) {
    return (
      <ErrorComponent
        title="Oooops"
        error={error}
        btn={{ handleClick: () => setError(''), text: 'Dismiss' }}
      />
    )
  }
  return (
    <main className="container">
      <ItemForm
        register={register}
        resetField={resetField}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        deleteAnnounce={deleteAnnounce}
        markAsExchangedAndDelete={markAsItemExchangedAndDelete}
        imagesPreviews={imagesPreviews}
        setImagesPreviews={setImagesPreviews}
      />
    </main>
  )
}

export default ManageItem
