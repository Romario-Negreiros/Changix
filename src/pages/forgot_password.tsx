import React from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useAuth } from '@utils/hooks'
import { handleErrors } from '@utils/handlers'

import { Error as ErrorComponent, Loader, Success } from '../components'

import formStyles from '@styles/components/Form.module.css'

import type { NextPage } from 'next'

interface FormField {
  email: string
}

const ForgotPassword: NextPage = () => {
  const [error, setError] = React.useState('')
  const [isLoaded, setIsLoaded] = React.useState(true)
  const [success, setSuccess] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormField>()
  const { sendPasswordResetEmail } = useAuth()

  const onSubmit: SubmitHandler<FormField> = async ({ email }) => {
    try {
      setIsLoaded(false)
      await sendPasswordResetEmail(email)
      setSuccess(true)
    } catch (err) {
      handleErrors(err, 'Send email to reset password', setError)
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
        title="Link succesfully sent!"
        message="Check your email to access the link"
      />
    )
  }
  return (
    <main className="container">
      <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1>Enter your email address to receive a reset password link</h1>
        <section className={formStyles.input_container}>
          <label htmlFor="email">Email</label>
          <input
            {...register('email', { required: 'Email is required' })}
            id="email"
          />
          <p className={formStyles.error}>{errors.email?.message}</p>
        </section>
        <button type="submit" style={{ maxWidth: '400px' }}>
          Send link
        </button>
      </form>
    </main>
  )
}

export default ForgotPassword
