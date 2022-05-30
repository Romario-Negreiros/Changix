import React from 'react'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import {
  handlePwdVisibility,
  handleFileSelection,
  handleCountrySelection,
  handleErrors
} from '@utils/handlers'
import { useAuth, useFirestore, useStorage } from '@utils/hooks'

import { Error as ErrorComponent, Loader } from '..'

import PhoneInput from 'react-phone-number-input/input'

import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import formStyles from '@styles/components/Form.module.css'

import { faCamera, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import type { SignUpFormFields, Country } from '@app/types/auth'
import type { VisiblePwds } from '@app/types/global'
import { User } from 'firebase/auth'

interface Props {
  countries: Country[]
  error: string
  setError: (error: string) => void
  isLoaded: boolean
  setIsLoaded: (isLoaded: boolean) => void
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

const SignUpForm: React.FC<Props> = ({
  countries,
  error,
  setError,
  isLoaded,
  setIsLoaded
}) => {
  const [visiblePwds, setVisiblePwds] = React.useState<VisiblePwds[]>([])
  const [imgPreview, setImgPreview] = React.useState('')
  const [country, setCountry] = React.useState<Country | undefined>()
  const { createUserWithEmailAndPassword, sendEmailVerification, deleteUser } = useAuth()
  const { setDoc } = useFirestore()
  const { uploadImages } = useStorage()
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<SignUpFormFields>()

  const fetchUserCountryCode = async (): Promise<Country | undefined> => {
    const response = await fetch(
      `https://api.ipregistry.co/?key=${process.env.NEXT_PUBLIC_IPREGISTRY_API_KEY}`
    )
    const data = await response.json()
    return {
      name: data.location?.country.name,
      alpha2Code: data.location?.country.code
    }
  }

  React.useEffect(() => {
    ;(async () => {
      const country = await fetchUserCountryCode()
      if (country) {
        setCountry(country)
        setValue('country', country.name)
      }
    })()
  }, [setValue])

  const onSubmit: SubmitHandler<SignUpFormFields> = async data => {
    let user: User | null = null
    try {
      if (data.confirmPwd === data.pwd) {
        setIsLoaded(false)
        user = await createUserWithEmailAndPassword(data.email, data.pwd)
        let pictureUrl = ''
        if (data.picture) {
          const [url] = await uploadImages(
            [data.picture[0]],
            ['users', user.uid]
          )
          pictureUrl = url
        }
        await setDoc(['users'], user.uid, {
          email: data.email,
          name: data.name,
          country: data.country,
          phoneNumber: data.phoneNumber,
          picture: pictureUrl,
          announcedItems: [],
          exchangedItems: 0
        })
        await sendEmailVerification(user)
      } else {
        throw new Error('Confirm password and password fields must be equal!')
      }
    } catch (err) {
      handleErrors(err, 'Sign up', setError)
      if (user) deleteUser(user)
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
  }
  return (
    <main className="container">
      <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <section className={formStyles.file_input_container}>
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
              accept="image/*"
              {...register('picture', {
                onChange: e => handleFileSelection(e, setImgPreview)
              })}
            />
          </label>
        </section>
        <section className={formStyles.input_container}>
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
          <p className={formStyles.error}>{errors.email?.message}</p>
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            {...register('name', {
              required: 'Name is required'
            })}
          />
          <p className={formStyles.error}>{errors.name?.message}</p>
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="pwd">Password</label>
          <div>
            <FontAwesomeIcon
              onClick={() =>
                handlePwdVisibility('pwd', visiblePwds, setVisiblePwds)
              }
              className={formStyles.icon}
              icon={visiblePwds.includes('pwd') ? faEyeSlash : faEye}
            />
            <input
              type={visiblePwds.includes('pwd') ? 'text' : 'password'}
              id="pwd"
              {...register('pwd', {
                required: 'Password is required',
                ...pwdValidationRules
              })}
            />
          </div>
          <p className={formStyles.error}>{errors.pwd?.message}</p>
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="confirmd_pwd">Confirm Password</label>
          <div>
            <FontAwesomeIcon
              onClick={() =>
                handlePwdVisibility('confirm_pwd', visiblePwds, setVisiblePwds)
              }
              className={formStyles.icon}
              icon={visiblePwds.includes('confirm_pwd') ? faEyeSlash : faEye}
            />
            <input
              type={visiblePwds.includes('confirm_pwd') ? 'text' : 'password'}
              id="confirm_pwd"
              {...register('confirmPwd', {
                required: 'You must repeat your password',
                ...pwdValidationRules
              })}
            />
          </div>
          <p className={formStyles.error}>{errors.confirmPwd?.message}</p>
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="country">Country</label>
          <input
            id="country"
            list="countries"
            {...register('country', {
              required: 'Country is required'
            })}
            onBlur={event =>
              handleCountrySelection(event, countries, setCountry, setValue)
            }
          />
          <datalist id="countries">
            {countries.map(country => (
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
              />
            )}
          />
          <p className={formStyles.error}>{errors.phoneNumber?.message}</p>
        </section>
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default SignUpForm
