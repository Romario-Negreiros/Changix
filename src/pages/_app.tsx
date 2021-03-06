import React from 'react'

import { useProvideAuth } from '@utils/hooks'
import { handleErrors } from '@utils/handlers'
import firebase from '@app/lib/firebase'

import { Layout, Error, AuthChecker } from '../components'

import '../styles/globals.css'
import '../styles/variables.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import authContext from '@app/contexts/authContext'

import type { AppProps } from 'next/app'
import type { NextPage } from 'next'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const [error, setError] = React.useState('')
  const auth = useProvideAuth()

  React.useEffect(() => {
    const unsubscribe = firebase.auth.instance.onAuthStateChanged(
      user => {
        auth.setUser(user)
      },
      error => {
        handleErrors(error as unknown, 'Auth state listener', setError)
      }
    )

    return () => unsubscribe()
  }, [auth])

  return (
    <authContext.Provider value={auth}>
      <Layout>
        <AuthChecker user={auth.user}>
          {error
            ? (
            <Error
              title="Oooops"
              error={error}
              btn={{ handleClick: () => setError(''), text: 'Dismiss' }}
            />
              )
            : (
            <Component {...pageProps} />
              )}
        </AuthChecker>
      </Layout>
    </authContext.Provider>
  )
}

export default MyApp
