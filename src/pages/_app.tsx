import React from 'react'

import { Layout } from '../components'

import '../styles/globals.css'
import '../styles/variables.css'
import 'react-datalist-input/dist/styles.css'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout >
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
