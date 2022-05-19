import React from 'react'

import { useRouter } from 'next/router'
import { useFirestore, useAuth } from '@utils/hooks'

import { Card, Error } from 'src/components'

import Sleeping from '@public/animations/sleeping.json'

import type { GetServerSideProps, NextPage } from 'next'
import type { Item } from '@app/types/item'

const containerStyles = {
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'center',
  flexFlow: 'row wrap',
  gap: '2rem',
  padding: '1rem',
  marginTop: '2rem'
}

interface Props {
  items: Item[]
  userId: string
  serverSideError?: string
}

export const getServerSideProps: GetServerSideProps = async context => {
  const userId = context.params?.userId

  if (!userId) {
    return {
      props: {
        serverSideError: 'Invalid id'
      }
    }
  }

  const firestoreFunctions = useFirestore
  const { getDocs } = firestoreFunctions()

  const results = await getDocs(['announced'], ['ownerId', '==', userId])
  if (results.empty) {
    return {
      props: {
        serverSideError: 'No announces created'
      }
    }
  }
  const items = results.docs.map(doc => {
    const data = doc.data() as Item
    return {
      id: doc.id,
      name: data.name,
      description: data.description
    }
  })

  return {
    props: {
      items,
      userId
    }
  }
}

const AnnouncedItems: NextPage<Props> = ({
  items,
  userId,
  serverSideError
}) => {
  const { user } = useAuth()
  const { back } = useRouter()

  if (serverSideError) {
    return (
      <Error
        title="zzzzz"
        error={serverSideError}
        animation={Sleeping}
        width="55%"
        btn={{ handleClick: () => back(), text: 'Go back' }}
      />
    )
  }
  return (
    <main style={containerStyles}>
      {items.map(item => (
        <Card
          key={item.id}
          item={item}
          linkHref={
            userId === user?.uid
              ? `/users/${userId}/announced_items/${item.id}`
              : `/items/${item.id}`
          }
          linkTxt={userId === user?.uid ? 'Edit' : 'Visit'}
        />
      ))}
    </main>
  )
}

export default AnnouncedItems
