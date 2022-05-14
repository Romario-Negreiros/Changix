import React from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'
import { handleAuthError } from '@utils/handlers'
import { useAuth } from '@utils/hooks'
import { useRouter } from 'next/router'

import { Error as ErrorComponent, Loader } from 'src/components'

import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Lottie from 'lottie-react'

import styles from '@styles/pages/SignIn.module.css'
import formStyles from '@styles/components/Form.module.css'

import Bubbles from '@public/animations/bubbles.json'

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import type { NextPage } from 'next'
import type { SignInFormFields } from '@app/types/auth'

const pwdValidationRules = {
  minLength: {
    value: 6,
    message: 'At least 6 characters'
  },
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%¨&*])[A-Za-z\d!@#$%¨&*]{6,}$/,
    message: 'At least one special character and one number'
  }
}

const SignIn: NextPage = () => {
  const [isPwdVisible, setIsPwdVisible] = React.useState(false)
  const [error, setError] = React.useState('')
  const [isLoaded, setIsLoaded] = React.useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormFields>()
  const { signInWithEmailAndPassword } = useAuth()
  const { push } = useRouter()

  const changePwdVisibility = () => setIsPwdVisible(!isPwdVisible)

  const onSubmit: SubmitHandler<SignInFormFields> = async ({ email, pwd }) => {
    try {
      setIsLoaded(false)
      await signInWithEmailAndPassword(email, pwd)
      push('/home')
    } catch (err) {
      handleAuthError(err, 'Sign in', setError)
      setIsLoaded(true)
    }
  }

  if (error) {
    return (
      <ErrorComponent
        title="Oooops"
        error={error}
        btn={{ handleClick: () => setError(''), text: 'Dismiss' }}
      />
    )
  } else if (!isLoaded) {
    return <Loader />
  }
  return (
    <main className="container">
      <div className={styles.bubbles} style={{ left: '0px' }}>
        <Lottie animationData={Bubbles} loop />
      </div>
      <form
        className={formStyles.form}
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: '500px' }}
      >
        <section className={formStyles.input_container}>
          <label htmlFor="email">Email</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^.+[@]{1}[aA-zZ]+[.]{1}.+$/,
                message: 'Invalid email format. example@mail.com'
              }
            })}
            id="email"
          />
          <p className={formStyles.error}>{errors.email?.message}</p>
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="pwd">Password</label>
          <div>
            <FontAwesomeIcon
              onClick={changePwdVisibility}
              className={formStyles.icon}
              icon={isPwdVisible ? faEyeSlash : faEye}
            />
            <input
              {...register('pwd', {
                required: 'Password is required',
                ...pwdValidationRules
              })}
              type={isPwdVisible ? 'text' : 'password'}
              id="pwd"
            />
          </div>
          <p className={formStyles.error}>{errors.pwd?.message}</p>
        </section>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '1rem',
            width: '100%'
          }}
        >
          <button type="submit" style={{ maxWidth: '300px' }}>
            Sign in
          </button>
          <Link href="/forgot_password">
            <a style={{ maxWidth: '300px' }}>Forgot your password?</a>
          </Link>
        </div>
      </form>
      <div className={styles.bubbles} style={{ right: '0px' }}>
        <Lottie animationData={Bubbles} loop />
      </div>
    </main>
  )
}

export default SignIn
