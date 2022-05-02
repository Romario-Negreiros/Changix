import React from 'react'

import Lottie from 'lottie-react'

import { useRouter } from 'next/router'

import styles from '@styles/ErrorPages.module.css'

import _404Animation from '@public/animations/404.json'

import type { NextPage } from 'next'

const _404: NextPage = () => {
  const router = useRouter()

  return (
    <main className={styles.container}>
      <section>
        <h1>Page not found... 🔍</h1>
        <div>
          <Lottie animationData={_404Animation} loop />
        </div>
        <p>
          You might have misspelled something in the url, or attempted to visit
          a page which was deleted.
        </p>
        <button onClick={() => router.back()}>Go back</button>
      </section>
    </main>
  )
}

export default _404
