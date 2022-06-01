import React from 'react'

import { useFirestore } from '@utils/hooks'
import { useRouter } from 'next/router'

import { Error } from '../../../components'

import { Carousel } from 'react-responsive-carousel'

import Image from 'next/image'
import Link from 'next/link'

import styles from '@styles/pages/Item.module.css'

import Sleeping from '@public/animations/sleeping.json'

import type { GetServerSideProps, NextPage } from 'next'
import type { Item as IItem } from '@app/types/item'
import { UserProfile } from '@app/types/firestore'

interface Props {
  item: IItem
  owner: UserProfile
  serverSideError?: string
}

export const getServerSideProps: GetServerSideProps = async context => {
  const itemId = context.params?.itemId

  if (!itemId) {
    return {
      props: {
        serverSideError: 'Invalid id!'
      }
    }
  }

  const firestoreFunctions = useFirestore
  const { getDoc } = firestoreFunctions()

  const item = await getDoc(['announced'], itemId as string)
  if (!item.exists()) {
    return {
      props: {
        serverSideError: 'Item not found!'
      }
    }
  }

  const itemData = item.data() as IItem
  const owner = await getDoc(['users'], itemData.ownerId)
  if (!owner.exists()) {
    return {
      props: {
        serverSideError: 'Item owner not found!'
      }
    }
  }

  return {
    props: {
      item: itemData,
      owner: {
        id: itemData.ownerId,
        ...owner.data()
      }
    }
  }
}

const Item: NextPage<Props> = ({ item, owner, serverSideError }) => {
  const { back } = useRouter()

  if (serverSideError) {
    return (
      <Error
        title="Oooops"
        error={serverSideError}
        width="55%"
        animation={Sleeping}
        btn={{ handleClick: () => back(), text: 'Go back' }}
      />
    )
  }
  return (
    <main className={styles.container}>
      <section className={styles.heading_container}>
        <h1>{item.name}</h1>
        <Link href={`/users/${owner.id}`}>
          <a>{owner.name}</a>
        </Link>
        <p>Category: {item.category}</p>
      </section>
      <article>
        <section className={styles.images_container}>
          <Carousel showThumbs={false}>
            <div>
              <Image
                src="/images/landing_page.png"
                width="400px"
                height="300px"
                alt="i hate this component"
              />
            </div>
            <div>
              <Image
                src="/images/453.jpg"
                width="400px"
                height="300px"
                alt="i hate this component"
              />
            </div>
          </Carousel>
        </section>
        <section className={styles.texts_container}>
          <div>
            <h2>Description</h2>
            <p>{item.description}</p>
          </div>
          <div>
            <h2>Contacts</h2>
            <p>{owner.email}</p>
            <p>{owner.phoneNumber}</p>
          </div>
        </section>
      </article>
    </main>
  )
}

export default Item
