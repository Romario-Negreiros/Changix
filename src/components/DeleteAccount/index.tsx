import React from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'

import { CloseModal } from '../'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import formStyles from '@styles/components/Form.module.css'

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import type { SharedProps } from '@app/types/modals'
import { User } from 'firebase/auth'
import { handleAuthError } from '@utils/handlers'
import Loader from '../Loader'
import Error from '../Error'
import Success from '../Success'

interface Props extends SharedProps {
  user: User
  deleteUser: (user: User) => Promise<void>
  reauthenticateWithCredential: (user: User, pwd: string) => Promise<void>
}

interface FormField {
  pwd: string
}

const DeleteAccount: React.FC<Props> = ({
  setModalState,
  user,
  deleteUser,
  reauthenticateWithCredential
}) => {
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState(false)
  const [isLoaded, setIsLoaded] = React.useState(true)
  const [isPwdVisible, setIsPwdVisible] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormField>()

  const changePwdVisibility = () => setIsPwdVisible(!isPwdVisible)

  const onSubmit: SubmitHandler<FormField> = async ({ pwd }) => {
    try {
      setIsLoaded(false)
      await reauthenticateWithCredential(user, pwd)
      await deleteUser(user)
      setSuccess(true)
    } catch (err) {
      handleAuthError(err, 'Delete user', setError)
    } finally {
      setIsLoaded(true)
    }
  }

  if (!isLoaded) {
    return <Loader isModal />
  } else if (error) {
    return (
      <Error
        title="Oooops"
        error={error}
        btn={{ handleClick: () => setError(''), text: 'Dismiss' }}
        isModal
      />
    )
  } else if (success) {
    return (
      <Success
        title="User succesfully deleted!"
        isModal
        redirect={{ url: '/sign_in', page: 'sign in' }}
      />
    )
  }
  return (
    <main className="modal_container">
      <form
        className={formStyles.form}
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: '500px' }}
      >
        <CloseModal setModalState={setModalState} />
        <section className={formStyles.input_container}>
          <label htmlFor="pwd">Password</label>
          <div>
            <FontAwesomeIcon
              onClick={changePwdVisibility}
              className={formStyles.icon}
              icon={isPwdVisible ? faEyeSlash : faEye}
            />
            <input
              type={isPwdVisible ? 'text' : 'password'}
              id="pwd"
              {...register('pwd', {
                required: 'Password is required!',
                minLength: {
                  value: 6,
                  message: 'At least 6 characters'
                },
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%¨&*])[A-Za-z\d!@#$%¨&*]{6,}$/,
                  message: 'At least one special character and one number'
                }
              })}
            />
          </div>
          <p className={formStyles.error}>{errors.pwd?.message}</p>
        </section>
        <button type="submit" style={{ backgroundColor: 'red' }}>
          Delete
        </button>
      </form>
    </main>
  )
}

export default DeleteAccount
