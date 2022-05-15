import React from 'react'

import { useRouter } from 'next/router'
import { useAuth } from '@utils/hooks'

import {
  ClientOnlyPortal,
  ChangePassword,
  DeleteAccount,
  Error,
  Buttons
} from '../../../components'

import Image from 'next/image'
import Link from 'next/link'

import formStyles from '@styles/components/Form.module.css'

import type { GetServerSideProps, NextPage } from 'next'
import { User as IUser } from 'firebase/auth'

type Modals = 'change_pwd' | 'delete_acc'

export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.params?.userId

  return {
    props: {
      user: {
        id
      }
    }
  }
}

interface Props {
  user: {
    id: string
  } | null
}

const User: NextPage<Props> = ({ user }) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [modalOpened, setModalOpened] = React.useState<Modals | null>(null)
  const { back } = useRouter()
  const {
    user: currentUser,
    updatePassword,
    reauthenticateWithCredential
  } = useAuth()

  const setModalState = () => {
    if (isModalOpen) setModalOpened(null)
    setIsModalOpen(!isModalOpen)
  }

  const setFormState = () => setIsEditing(!isEditing)

  if (!user) {
    return (
      <Error
        title="Oooops"
        error="User not found!"
        btn={{ handleClick: () => back(), text: 'Go back' }}
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
            <DeleteAccount setModalState={setModalState} />
          )}
        </ClientOnlyPortal>
      )}
      <form className={formStyles.form}>
        <section className={formStyles.file_input_container}>
          <label style={{ cursor: isEditing ? 'pointer' : 'default' }}>
            <Image
              src="/icons/logo.svg"
              width={50}
              height={50}
              alt="user.name"
            />
            <input
              disabled={!isEditing}
              type="file"
              accept=".jpg,.jpeg,.png,.svg"
            />
          </label>
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="email">Email</label>
          <input readOnly={!isEditing} id="email" />
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="name">Name</label>
          <input readOnly={!isEditing} id="name" />
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="country">Country</label>
          <input readOnly={!isEditing} id="country" />
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="phone_number">Phone number</label>
          <input readOnly={!isEditing} id="phone_number" />
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="announced_items">
            <Link href="/users/58/announced_items">
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
          <input readOnly={!isEditing} defaultValue={4} id="announced_items" />
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="exchanged_items">Exchanged items</label>
          <input readOnly={!isEditing} defaultValue={19} id="exchanged_items" />
        </section>
        {currentUser?.uid !== user.id && (
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
