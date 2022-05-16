import React from 'react'

import { handleAuthError, handlePwdVisibility } from '@utils/handlers'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Error as ErrorComponent, Loader } from '../'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import formStyles from '@styles/components/Form.module.css'

import { faEye, faEyeSlash, faClose } from '@fortawesome/free-solid-svg-icons'

import type { SharedProps } from '@app/types/modals'
import type { VisiblePwds } from '@app/types/global'
import type { AuthContext } from '@app/types/auth'
import { User } from 'firebase/auth'

interface Props extends SharedProps, Pick<AuthContext, 'updatePassword' | 'reauthenticateWithCredential'> {
  user: User
}

interface FormFields {
  newPwd: string
  confirmNewPwd: string
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

const ChangePassword: React.FC<Props> = ({ setModalState, user, updatePassword, reauthenticateWithCredential }) => {
  const [error, setError] = React.useState('')
  const [isLoaded, setIsLoaded] = React.useState(true)
  const [visiblePwds, setVisiblePwds] = React.useState<VisiblePwds[]>([])
  const { register, handleSubmit, formState: { errors } } = useForm<FormFields>()

  const onSubmit: SubmitHandler<FormFields> = async ({ newPwd, confirmNewPwd }) => {
    try {
      if (newPwd === confirmNewPwd) {
        setIsLoaded(false)
        await reauthenticateWithCredential(user)
        await updatePassword(user, newPwd)
      } else {
        throw new Error('New password and confirm new password fields must be equal!')
      }
    } catch (err) {
      handleAuthError(err, 'Update password', setError)
    } finally {
      setIsLoaded(true)
    }
  }

  if (!isLoaded) {
    return <Loader />
  } else if (error) {
    return <ErrorComponent title="Oooops" error={error} btn={{ handleClick: () => setError(''), text: 'Dismiss' }} />
  }
  return (
    <main className="modal_container">
      <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className="close_modal" onClick={setModalState}>
          <FontAwesomeIcon icon={faClose} color="red" width={50} height={50} />
        </div>
        <section className={formStyles.input_container}>
          <label htmlFor="new_pwd">New Password</label>
          <div>
            <FontAwesomeIcon
              onClick={() =>
                handlePwdVisibility('new_pwd', visiblePwds, setVisiblePwds)
              }
              className={formStyles.icon}
              icon={visiblePwds.includes('new_pwd') ? faEyeSlash : faEye}
            />
            <input
              type={visiblePwds.includes('new_pwd') ? 'text' : 'password'}
              id="new_pwd"
              {...register('newPwd', {
                required: 'New password is required',
                ...pwdValidationRules
              })}
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
              type={
                visiblePwds.includes('confirm_new_pwd') ? 'text' : 'password'
              }
              id="confirm_new_pwd"
              {...register('confirmNewPwd', {
                required: 'Confirming your new password is required',
                ...pwdValidationRules
              })}
            />
          </div>
          <p className={formStyles.error}>{errors.confirmNewPwd?.message}</p>
        </section>
        <button type="submit">Change</button>
      </form>
    </main>
  )
}

export default ChangePassword