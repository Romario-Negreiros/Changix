import React from 'react'

import { useProvideAuth } from '@utils/hooks'
import { handleAuthError } from '@utils/handlers'
import firebase from '@app/lib/firebase'

import { Layout, Error } from '../components'

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
        handleAuthError(error as unknown, 'Auth state listener', setError)
      }
    )

    return () => unsubscribe()
  }, [auth])

  return (
    <authContext.Provider value={auth}>
      <Layout>
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
      </Layout>
    </authContext.Provider>
  )
}

export default MyApp
