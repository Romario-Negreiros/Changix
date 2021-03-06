import React from 'react'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useRouter } from 'next/router'
import {
  handleFileSelection,
  handleCountrySelection,
  handleErrors
} from '@utils/handlers'
import { useAuth, useFirestore, useStorage } from '@utils/hooks'

import {
  ClientOnlyPortal,
  ChangePassword,
  DeleteAccount,
  Error as ErrorComponent,
  Loader,
  Buttons
} from '../../../components'

import PhoneInput from 'react-phone-number-input/input'

import Image from 'next/image'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import formStyles from '@styles/components/Form.module.css'

import { faCamera } from '@fortawesome/free-solid-svg-icons'

import Sleeping from '@public/animations/sleeping.json'

import type { GetServerSideProps, NextPage } from 'next'
import { User as IUser } from 'firebase/auth'
import { UserProfile } from '@app/types/firestore'
import type { Country } from '@app/types/auth'

type Modals = 'change_pwd' | 'delete_acc'

interface FetchedCountry {
  name: {
    common: string
  }
  cca2: string
}

interface Props {
  user: UserProfile | null
  countries?: Country[]
  serverSideError?: string
}

interface FormFields extends Omit<UserProfile, 'picture' | 'id' | 'email'> {
  picture: FileList
}

export const getServerSideProps: GetServerSideProps = async context => {
  const userId = context.params?.userId

  if (!userId) {
    return {
      props: {
        serverSideError: 'Invalid id!'
      }
    }
  }

  const firestoreFunctions = useFirestore
  const { getDoc } = firestoreFunctions()
  const user = await getDoc(['users'], userId as string)

  if (!user.exists()) {
    return {
      props: {
        serverSideError: 'User not found!'
      }
    }
  }

  const response = await fetch('https://restcountries.com/v3.1/all')
  const data = await response.json()

  const countries = data.map((country: FetchedCountry) => {
    return {
      name: country.name.common,
      alpha2Code: country.cca2
    }
  })

  return {
    props: {
      user: {
        id: userId,
        ...user.data()
      },
      countries
    }
  }
}

const User: NextPage<Props> = ({ user, countries, serverSideError }) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [modalOpened, setModalOpened] = React.useState<Modals | null>(null)
  const [isLoaded, setIsLoaded] = React.useState(true)
  const [error, setError] = React.useState(serverSideError)
  const [imgPreview, setImgPreview] = React.useState('')
  const [country, setCountry] = React.useState<Country | undefined>()
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<FormFields>({
    defaultValues: {
      name: user?.name,
      country: user?.country,
      phoneNumber: user?.phoneNumber
    }
  })
  const { back } = useRouter()
  const {
    user: currentUser,
    updatePassword,
    reauthenticateWithCredential,
    deleteUser
  } = useAuth()
  const { updateDoc } = useFirestore()
  const { uploadImages } = useStorage()

  React.useEffect(() => {
    if (user && countries) {
      const userCountry = countries.find(
        country => country.name.toLowerCase() === user?.country.toLowerCase()
      )
      setCountry(userCountry)
    }
  }, [countries, user])

  const setModalState = () => {
    if (isModalOpen) setModalOpened(null)
    setIsModalOpen(!isModalOpen)
  }

  const setFormState = () => setIsEditing(!isEditing)

  const onSubmit: SubmitHandler<FormFields> = async data => {
    try {
      setIsLoaded(false)
      let pictureUrl = user?.picture
      if (data.picture.length) {
        const [url] = await uploadImages(
          [data.picture[0]],
          ['users', user?.id as string]
        )
        pictureUrl = url
      }
      await updateDoc(['users'], currentUser?.uid as string, {
        name: data.name,
        country: data.country,
        picture: pictureUrl,
        phoneNumber: data.phoneNumber
      })
    } catch (err) {
      handleErrors(err, 'Update User Information', setError)
    } finally {
      setIsEditing(false)
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
        animation={error === 'User not found!' ? Sleeping : undefined}
        width="50%"
        btn={{
          handleClick: () => (serverSideError ? back() : setError('')),
          text: serverSideError ? 'Go back' : 'Dismiss'
        }}
      />
    )
  }
  return (
    <main className="container">
      {isModalOpen && (
        <ClientOnlyPortal selector="#modal">
          {modalOpened === 'change_pwd' && (
            <ChangePassword
              setModalState={setModalState}
              user={currentUser as IUser}
              updatePassword={updatePassword}
              reauthenticateWithCredential={reauthenticateWithCredential}
            />
          )}
          {modalOpened === 'delete_acc' && (
            <DeleteAccount
              setModalState={setModalState}
              user={currentUser as IUser}
              userProfile={user as UserProfile}
              deleteUser={deleteUser}
              reauthenticateWithCredential={reauthenticateWithCredential}
            />
          )}
        </ClientOnlyPortal>
      )}
      <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <section className={formStyles.file_input_container}>
          <label style={{ cursor: isEditing ? 'pointer' : 'default' }}>
            {user?.picture && !imgPreview && (
              <Image
                src={user.picture}
                width={100}
                height={75}
                alt={user.name}
              />
            )}
            {imgPreview && (
              <Image
                src={imgPreview}
                width={100}
                height={75}
                alt="Image preview"
              />
            )}
            {!user?.picture && !imgPreview && (
              <FontAwesomeIcon
                icon={faCamera}
                color="#8661c1"
                height={25}
                width={25}
              />
            )}
            <input
              disabled={!isEditing}
              type="file"
              accept="image/*"
              {...register('picture', {
                onChange: e => handleFileSelection(e, setImgPreview)
              })}
            />
          </label>
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="email">Email</label>
          <input id="email" readOnly defaultValue={user?.email} />
          <p className={formStyles.error}></p>
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            readOnly={!isEditing}
            {...register('name', {
              required: 'Name is required'
            })}
          />
          <p className={formStyles.error}>{errors.name?.message}</p>
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="country">Country</label>
          <input
            id="country"
            list="countries"
            readOnly={!isEditing}
            {...register('country', {
              required: 'Country is required'
            })}
            onBlur={event =>
              handleCountrySelection(
                event,
                countries as Country[],
                setCountry,
                setValue
              )
            }
          />
          <datalist id="countries">
            {countries?.map(country => (
              <option key={country.name} value={country.name} />
            ))}
          </datalist>
          <p className={formStyles.error}>{errors.country?.message}</p>
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="phone_number">Phone number</label>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: 'Phone number is required'
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                id="phone_input"
                country={country?.alpha2Code}
                onChange={onChange}
                value={value}
                readOnly={!isEditing}
              />
            )}
          />
          <p className={formStyles.error}>{errors.phoneNumber?.message}</p>
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="announced_items">
            <Link href={`/users/${user?.id}/announced_items`}>
              <a
                style={{
                  padding: 0,
                  backgroundColor: 'unset',
                  color: 'var(--colors-secondary)',
                  textDecoration: 'underline var(--colors-secondary)'
                }}
              >
                Announced items
              </a>
            </Link>
          </label>
          <input
            readOnly={!isEditing}
            defaultValue={user?.announcedItems.length}
            id="announced_items"
          />
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="exchanged_items">Exchanged items</label>
          <input
            readOnly={!isEditing}
            defaultValue={user?.exchangedItems}
            id="exchanged_items"
          />
        </section>
        {currentUser?.uid === user?.id && (
          <Buttons
            isEditing={isEditing}
            setFormState={setFormState}
            setModalState={setModalState}
            setModalOpened={setModalOpened}
          />
        )}
      </form>
    </main>
  )
}

export default User
