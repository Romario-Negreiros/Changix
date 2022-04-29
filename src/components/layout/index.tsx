import React from 'react'

import Header from './Header/Header'

import Head from 'next/head'

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Changix</title>
        <link rel="shortcut icon" href="icons/favicon.ico" />
      </Head>

      <Header />
      {children}
    </>
  )
}

export default Layout
