import React from 'react'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'

import PhoneInput from 'react-phone-number-input/input'

import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import formStyles from '@styles/components/Form.module.css'

import { faCamera, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import type { FormFields, Country } from '@app/types/auth'

type TVisiblePwd = ('pwd' | 'confirm_pwd')[]

interface Props {
  countries: Country[]
}

const Form: React.FC<Props> = ({ countries }) => {
  const [visiblePwd, setVisiblePwd] = React.useState<TVisiblePwd>([])
  const [imgPreview, setImgPreview] = React.useState('')
  const [country, setCountry] = React.useState<Country | undefined>()
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<FormFields>()

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
            onChange={handleFileSelection}
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
            onClick={() => handlePwdVisibility('pwd')}
            className={formStyles.icon}
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
        <p className={formStyles.error}>{errors.pwd?.message}</p>
      </section>
      <section className={formStyles.input_container}>
        <label htmlFor="confirmd_pwd">Confirm Password</label>
        <div>
          <FontAwesomeIcon
            onClick={() => handlePwdVisibility('confirm_pwd')}
            className={formStyles.icon}
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
  )
}

export default Form
