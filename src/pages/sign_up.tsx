import React from 'react'

import { useAuth } from '@utils/hooks'
import { useRouter } from 'next/router'

import { SignUpForm, VerifyEmailMessage } from '../components'

import type { NextPage, GetStaticProps } from 'next'
import type { Country } from '@app/types/auth'

interface FetchedCountry {
  name: {
    common: string
  }
  cca2: string
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all')
  const data = await response.json()

  const countries = data.map((country: FetchedCountry) => {
    return {
      name: country.name.common,
      alpha2Code: country.cca2
    }
  })

  return {
    props: {
      countries
    }
  }
}

interface Props {
  countries: Country[]
}

const SignUp: NextPage<Props> = ({ countries }) => {
  const [error, setError] = React.useState('')
  const [isLoaded, setIsLoaded] = React.useState(true)
  const { user } = useAuth()
  const { push } = useRouter()

  React.useEffect(() => {
    if (user && user.emailVerified) {
      push('/home')
    }
  })

  return (
    <>
      {user && !user.emailVerified && !error && isLoaded
        ? (
        <VerifyEmailMessage />
          )
        : (
        <SignUpForm
          countries={countries}
          error={error}
          setError={setError}
          isLoaded={isLoaded}
          setIsLoaded={setIsLoaded}
        />
          )}
    </>
  )
}

export default SignUp
