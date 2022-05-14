import React from 'react'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { handlePwdVisibility, handleFileSelection, handleAuthError } from '@utils/handlers'
import { useAuth } from '@utils/hooks'

import { Error as ErrorComponent, Loader } from '../../'

import PhoneInput from 'react-phone-number-input/input'

import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import formStyles from '@styles/components/Form.module.css'

import { faCamera, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import type { SignUpFormFields, Country } from '@app/types/auth'
import type { VisiblePwds } from '@app/types/global'

interface Props {
  countries: Country[]
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

const Form: React.FC<Props> = ({ countries }) => {
  const [visiblePwds, setVisiblePwds] = React.useState<VisiblePwds[]>([])
  const [imgPreview, setImgPreview] = React.useState('')
  const [country, setCountry] = React.useState<Country | undefined>()
  const [error, setError] = React.useState('')
  const [isLoaded, setIsLoaded] = React.useState(true)
  const { createUserWithEmailAndPassword, sendEmailVerification } = useAuth()
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
    try {
      if (data.confirmPwd === data.pwd) {
        setIsLoaded(false)
        const user = await createUserWithEmailAndPassword(data.email, data.pwd)
        await sendEmailVerification(user)
      } else {
        throw new Error('Confirm password and password fields must be equal!')
      }
    } catch (err) {
      handleAuthError(err, 'Sign up', setError)
    } finally {
      setIsLoaded(true)
    }
  }

  const handleCountrySelection = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget) {
      const { value } = event.currentTarget
      const selectedCountry = countries.find(country =>
        country.name.toLowerCase().includes(value.toLowerCase())
      )
      if (selectedCountry) {
        if (selectedCountry.name !== value) {
          setValue('country', selectedCountry.name)
        }
        setCountry(selectedCountry)
      }
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
              accept=".jpg,.jpeg,.png,.svg"
              {...register('picture')}
              onChange={(e) => handleFileSelection(e, setImgPreview)}
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
            onBlur={handleCountrySelection}
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

export default Form
