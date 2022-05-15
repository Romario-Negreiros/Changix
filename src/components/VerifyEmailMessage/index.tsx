import React from 'react'

import Link from 'next/link'

import Lottie from 'lottie-react'

import styles from '@styles/components/VerifyEmailMessage.module.css'

import Waiting from '@public/animations/waiting.json'

const VerifyEmailMessage: React.FC = () => {
  return (
    <main className="container">
      <section className={styles.container}>
        <p>
          Now check your email&apos;s inbox and click the link to verify your
          email! <br />
        </p>
        <div>
          <Lottie animationData={Waiting} loop />
        </div>
        <Link href="/home">
          <a>Already verified?</a>
        </Link>
      </section>
    </main>
  )
}

export default VerifyEmailMessage
