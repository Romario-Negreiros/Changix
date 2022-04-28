import React from 'react'

import Head from 'next/head'

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Changix</title>
        <link rel="shortcut icon" href="images/logo.svg" />
      </Head>
      {children}
    </>
  )
}

export default Layout
