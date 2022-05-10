import React from 'react'

import Lottie from 'lottie-react'

import { useRouter } from 'next/router'

import styles from '@styles/pages/Error.module.css'

import _500Animation from '@public/animations/500.json'

import type { NextPage } from 'next'

const _500: NextPage = () => {
  const router = useRouter()

  return (
    <main className={styles.container}>
      <section>
        <h1>Calm down, please... 😰</h1>
        <div style={{ width: '55%' }}>
          <Lottie animationData={_500Animation} loop />
        </div>
        <p>
          An error occured while trying to complete the action, please go back
          and try again!
        </p>
        <button onClick={() => router.back()}>Go back</button>
      </section>
    </main>
  )
}

export default _500
