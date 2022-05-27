import React from 'react'

import { handleErrors, handlePwdVisibility } from '@utils/handlers'
import { useAuth } from '@utils/hooks'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Error as ErrorComponent, Loader, Success } from '..'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import formStyles from '@styles/components/Form.module.css'

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import type { ResetPasswordFormFields } from '@app/types/auth'
import type { VisiblePwds } from '@app/types/global'

interface Props {
  oobCode: string
}

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

const ResetPassword: React.FC<Props> = ({ oobCode }) => {
  const [visiblePwds, setVisiblePwds] = React.useState<VisiblePwds[]>([])
  const [error, setError] = React.useState('')
  const [isLoaded, setIsLoaded] = React.useState(true)
  const [success, setSuccess] = React.useState(false)
  const { confirmPasswordReset } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordFormFields>()

  const onSubmit: SubmitHandler<ResetPasswordFormFields> = async ({
    newPwd,
    confirmNewPwd
  }) => {
    try {
      if (newPwd === confirmNewPwd) {
        setIsLoaded(false)
        await confirmPasswordReset(oobCode, newPwd)
        setSuccess(true)
      } else {
        throw new Error('New password and confirm new password fields must be equal!')
      }
    } catch (err) {
      handleErrors(err, 'Reset password', setError)
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
        title="Password succesfully reseted!"
        redirect={{
          url: '/sign_in',
          page: 'sign in'
        }}
      />
    )
  }
  return (
    <main className="container">
      <form
        className={formStyles.form}
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: '500px' }}
      >
        <section className={formStyles.input_container}>
          <label htmlFor="pwd">New Password</label>
          <div>
            <FontAwesomeIcon
              onClick={() =>
                handlePwdVisibility('new_pwd', visiblePwds, setVisiblePwds)
              }
              className={formStyles.icon}
              icon={visiblePwds.includes('new_pwd') ? faEyeSlash : faEye}
            />
            <input
              {...register('newPwd', {
                required: 'New password is required',
                ...pwdValidationRules
              })}
              type={visiblePwds.includes('new_pwd') ? 'text' : 'password'}
              id="pwd"
            />
          </div>
          <p className={formStyles.error}>{errors.newPwd?.message}</p>
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="confirm_new_pwd">Confirm New Password</label>
          <div>
            <FontAwesomeIcon
              onClick={() =>
                handlePwdVisibility(
                  'confirm_new_pwd',
                  visiblePwds,
                  setVisiblePwds
                )
              }
              className={formStyles.icon}
              icon={
                visiblePwds.includes('confirm_new_pwd') ? faEyeSlash : faEye
              }
            />
            <input
              {...register('confirmNewPwd', {
                required: 'You must repeat your new password',
                ...pwdValidationRules
              })}
              type={
                visiblePwds.includes('confirm_new_pwd') ? 'text' : 'password'
              }
              id="confirm_new_pwd"
            />
          </div>
          <p className={formStyles.error}>{errors.confirmNewPwd?.message}</p>
        </section>
        <button type="submit">Reset</button>
      </form>
    </main>
  )
}

export default ResetPassword
