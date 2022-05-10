import React from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'

import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from '@styles/components/Form.module.css'

import { faCamera, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import type { FormFields, Country } from '@app/types/auth'

type TVisiblePwd = ('pwd' | 'confirm_pwd')[]

interface Props {
  countries: Country[]
}

const Form: React.FC<Props> = ({ countries }) => {
  const [visiblePwd, setVisiblePwd] = React.useState<TVisiblePwd>([])
  const [imgPreview, setImgPreview] = React.useState('')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormFields>()

  const handlePwdVisibility = (key: 'pwd' | 'confirm_pwd') => {
    if (visiblePwd.includes(key)) {
      setVisiblePwd(oldVisiblePwds =>
        oldVisiblePwds.filter(visiblePwd => visiblePwd !== key)
      )
    } else {
      setVisiblePwd([...visiblePwd, key])
    }
  }

  const onSubmit: SubmitHandler<FormFields> = data => {
    console.log(data)
  }

  const handleFileSelection = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget) {
      const input = event.currentTarget
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        setImgPreview(reader.result as string)
      })

      if (input.files) {
        reader.readAsDataURL(input.files[0])
      }
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <section className={styles.file_input_container}>
        <label>
          {imgPreview
            ? (
            <Image
              src={imgPreview}
              width={100}
              height={75}
              alt="Image preview"
            />
              )
            : (
            <FontAwesomeIcon
              icon={faCamera}
              color="#8661c1"
              height={25}
              width={25}
            />
              )}
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.svg"
            {...register('picture')}
            onChange={handleFileSelection}
          />
        </label>
      </section>
      <section className={styles.input_container}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^.+[@]{1}[aA-zZ]+[.]{1}.+$/,
              message: 'Invalid email format. example@mail.com'
            }
          })}
        />
        <p className="error">{errors.email?.message}</p>
      </section>
      <section className={styles.input_container}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register('name', {
            required: 'Name is required'
          })}
        />
        <p className="error">{errors.name?.message}</p>
      </section>
      <section className={styles.input_container}>
        <label htmlFor="pwd">Password</label>
        <div>
          <FontAwesomeIcon
            onClick={() => handlePwdVisibility('pwd')}
            className={styles.icon}
            icon={visiblePwd.includes('pwd') ? faEyeSlash : faEye}
          />
          <input
            type={visiblePwd.includes('pwd') ? 'text' : 'password'}
            id="pwd"
            {...register('pwd', {
              required: 'Password is required',
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
        <p className="error">{errors.pwd?.message}</p>
      </section>
      <section className={styles.input_container}>
        <label htmlFor="confirmd_pwd">Confirm Password</label>
        <div>
          <FontAwesomeIcon
            onClick={() => handlePwdVisibility('confirm_pwd')}
            className={styles.icon}
            icon={visiblePwd.includes('confirm_pwd') ? faEyeSlash : faEye}
          />
          <input
            type={visiblePwd.includes('confirm_pwd') ? 'text' : 'password'}
            id="confirm_pwd"
            {...register('confirmPwd', {
              required: 'You must repeat your password',
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
        <p className="error">{errors.confirmPwd?.message}</p>
      </section>
      <section className={styles.input_container}>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          list="countries"
          {...register('country', {
            required: 'Country is required'
          })}
        />
        <datalist id="countries">
          {countries.map(country => (
            <option key={country.name} value={country.name} />
          ))}
        </datalist>
        <p className="error">{errors.country?.message}</p>
      </section>
      <section className={styles.input_container}>
        <label htmlFor="phone_number">Phone number</label>
        <input
          id="phone_number"
          {...register('phoneNumber', {
            required: 'Phone number is required'
          })}
        />
        <p className="error">{errors.phoneNumber?.message}</p>
      </section>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Form
