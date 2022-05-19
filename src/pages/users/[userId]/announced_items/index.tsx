import React from 'react'

import { Card } from 'src/components'

import type { NextPage } from 'next'

const containerStyles = {
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'center',
  flexFlow: 'row wrap',
  gap: '2rem',
  padding: '1rem',
  marginTop: '2rem'
}

const AnnouncedItems: NextPage = () => {
  return (
    <main style={containerStyles}>
      {new Array(50).fill(1).map((value, index) => (
        <Card key={value * index} linkHref={`/users/5/announced_items/${index}`}/>
      ))}
    </main>
  )
}

export default AnnouncedItems
