import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import formStyles from '@styles/Form.module.css'

import type { NextPage } from 'next'

const containerStyles = {
  display: 'grid',
  placeItems: 'center',
  padding: '2rem',
  minHeight: 'calc(100vh - 60px)'
}

const User: NextPage = () => {
  const [isEditing, setIsEditing] = React.useState(false)

  const setFormState = () => {
    setIsEditing(!isEditing)
  }

  return (
    <main style={containerStyles}>
      <form className={formStyles.form}>
        <section className={formStyles.file_input_container}>
          <label>
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
          <label htmlFor="announced_items">Announced items</label>
          <input readOnly={!isEditing} defaultValue={4} id="announced_items" />
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="exchanged_items">Exchanged items</label>
          <input readOnly={!isEditing} defaultValue={19} id="exchanged_items" />
        </section>
        {!isEditing && (
          <button type="button" onClick={setFormState}>
            Update informations
          </button>
        )}
        {isEditing && <button type="submit">Save</button>}
        <Link href="/users/:id/password">
          <a>Update password</a>
        </Link>
      </form>
    </main>
  )
}

export default User
