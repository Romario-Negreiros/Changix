import React from 'react'

import { Carousel } from 'react-responsive-carousel'

import Image from 'next/image'
import Link from 'next/link'

import styles from '@styles/pages/Item.module.css'

import type { NextPage } from 'next'

const Item: NextPage = () => {
  return (
    <main className={styles.container}>
      <section className={styles.heading_container}>
        <h1>item.name</h1>
        <Link href="/users/:id">
          <a>Announcer</a>
        </Link>
        <p>Announced at: 15/02/4789 - 12:45:7895</p>
      </section>
      <article>
        <section className={styles.images_container}>
          <Carousel showThumbs={false}>
            <div>
              <Image src="/images/landing_page.png" width="400px" height="300px" alt="i hate this component" />
            </div>
            <div>
              <Image src="/images/453.jpg" width="400px" height="300px" alt="i hate this component" />
            </div>
          </Carousel>
        </section>
        <section className={styles.texts_container}>
          <div>
            <h2>Description</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aut
              explicabo molestiae repudiandae quia ea! Enim repellat vel,
              consequuntur quas minima recusandae dignissimos. Repellendus animi
              modi molestias harum dolorum temporibus sequi culpa sed autem
              placeat architecto laudantium consequuntur, voluptates, adipisci,
              dolorem rem. Ad impedit ipsum dignissimos reprehenderit vel eius
              praesentium!
            </p>
          </div>
          <div>
            <h2>Contacts</h2>
            <p>email@email.com</p>
            <p>95959167962632</p>
          </div>
        </section>
      </article>
    </main>
  )
}

export default Item
