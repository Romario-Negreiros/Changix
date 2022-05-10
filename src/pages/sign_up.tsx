import React from 'react'

import { Form } from '../components'

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
  return (
    <main className="container">
      <Form countries={countries} />
      {/* VerfiyEmailMessage = 2 */}
    </main>
  )
}

export default SignUp
