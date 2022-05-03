import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import styles from '@styles/Home.module.css'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <main className={styles.container}>
      <section className={styles.input_container}>
        <input />
      </section>
      <article className={styles.results_container}>
        <h1>Showing results for: auhsuahsuahsuash</h1>
        <ul>
          {new Array(50).fill(1).map((value, index) => (
            <li key={value * index}>
              <section className={styles.user_container}>
                <div>
                  <Image
                    loading="lazy"
                    src="/icons/logo.svg"
                    width={50}
                    height={50}
                    alt="item.owner.name"
                  />
                </div>
                <h2>item.owner.name</h2>
              </section>
              <section className={styles.item_image_container}>
                <Image src="/images/landing_page.png" width="400px" height="200px" alt="landing" />
              </section>
              <Link href="/items/category/:id">
                <a>Visit</a>
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </main>
  )
}

export default Home
