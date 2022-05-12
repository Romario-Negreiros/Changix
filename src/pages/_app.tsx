import React from 'react'

import { useProvideAuth } from '@utils/hooks'
import firebase from '@app/lib/firebase'

import { Layout } from '../components'

import '../styles/globals.css'
import '../styles/variables.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import authContext from '@app/contexts/authContext'

import type { AppProps } from 'next/app'
import type { NextPage } from 'next'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const auth = useProvideAuth()

  React.useEffect(() => {
    const unsubscribe = firebase.auth.instance.onAuthStateChanged(user => {
      auth.setUser(user)
    })

    return () => unsubscribe()
  }, [auth])

  return (
    <authContext.Provider value={auth}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </authContext.Provider>
  )
}

export default MyApp
