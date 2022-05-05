import React from 'react'

import { Card } from 'src/components'

import type { NextPage } from 'next'

const containerStyles = {
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'center',
  flexFlow: 'row wrap',
  gap: '2rem',
  marginTop: '2rem'
}

const AnnouncedItems: NextPage = () => {
  return (
    <main style={containerStyles}>
      {new Array(50).fill(1).map((value, index) => (
        <Card key={value * index} />
      ))}
    </main>
  )
}

export default AnnouncedItems
