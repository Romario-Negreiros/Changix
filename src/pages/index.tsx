import React from 'react'

import Link from 'next/link'

import Lottie from 'lottie-react'

import styles from '../styles/Landing.module.css'

import LandingAnimation from '../../public/animations/landing.json'

import type { NextPage } from 'next'

const Landing: NextPage = () => {
  return (
    <main className={styles.container}>
      <article className={styles.texts_container}>
        <section>
          <h1>Get rid of the old and find out the new</h1>
          <p>
            Here you can share the stuff under your bed for the last 10 years,
            and find new things to change with people all over the world.
          </p>
        </section>
        <section>
          <Link href="/sign_up">
            <a>Sign up now</a>
          </Link>
          <Link href="/home">
            <a>Explore</a>
          </Link>
        </section>
      </article>
      <section className={styles.decorations_container}>
        <div>
          <Lottie animationData={LandingAnimation} loop />
        </div>
      </section>
    </main>
  )
}

export default Landing
