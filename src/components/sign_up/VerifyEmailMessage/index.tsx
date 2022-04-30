import React from 'react'

import styles from '@styles/VerifyEmailMessage.module.css'

const VerifyEmailMessage: React.FC = () => {
  return (
    <section className={styles.container}>
      <p>
        Now check your email&apos;s inbox and click the link to verify your
        email!
      </p>
    </section>
  )
}

export default VerifyEmailMessage
