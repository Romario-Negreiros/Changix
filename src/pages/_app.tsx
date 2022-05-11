import React from 'react'

import { AuthProvider } from '@utils/services/auth'
import { Layout } from '../components'

import '../styles/globals.css'
import '../styles/variables.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import type { AppProps } from 'next/app'
import type { NextPage } from 'next'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
