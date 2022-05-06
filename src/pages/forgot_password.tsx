import React from 'react'

import formStyles from '@styles/components/Form.module.css'

import type { NextPage } from 'next'

const ForgotPassword: NextPage = () => {
  return (
    <main className="container">
      <form className={formStyles.form}>
        <h1>
          Enter your email address to receive a reset password link
        </h1>
        <section className={formStyles.input_container}>
          <label htmlFor="email">Email</label>
          <input id="email"/>
        </section>
        <button type="submit" style={{ maxWidth: '400px' }}>Send link</button>
      </form>
    </main>
  )
}

export default ForgotPassword
