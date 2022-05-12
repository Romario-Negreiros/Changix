import React from 'react'

import Lottie from 'lottie-react'

import styles from '@styles/components/VerifyEmailMessage.module.css'

import Waiting from '@public/animations/waiting.json'

import { User } from 'firebase/auth'
import { useRouter } from 'next/router'

interface Props {
  user: User
}

const VerifyEmailMessage: React.FC<Props> = ({ user }) => {
  const router = useRouter()

  React.useEffect(() => {
    if (user.emailVerified) {
      router.push('/home')
    }
  }, [user.emailVerified, router])

  return (
    <main className="container">
      <section className={styles.container}>
        <p>
          Now check your email&apos;s inbox and click the link to verify your
          email!
        </p>
        <div>
          <Lottie animationData={Waiting} loop />
        </div>
      </section>
    </main>
  )
}

export default VerifyEmailMessage
