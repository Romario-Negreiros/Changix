import React from 'react'

import Lottie, { LottieRefCurrentProps } from 'lottie-react'

import styles from '@styles/components/VerifyEmailMessage.module.css'

import Waiting from '@public/animations/waiting.json'
import Success from '@public/animations/success-tick.json'

const VerifyEmailMessage: React.FC = () => {
  const [verified, setVerified] = React.useState(false)
  const lottieRef = React.useRef<LottieRefCurrentProps>(null)

  React.useEffect(() => {
    if (!verified) {
      setTimeout(() => setVerified(true), 5000)
    } else {
      // Stops the animation to leave it in the screen before it disappears
      const durationInSeconds = lottieRef.current?.getDuration() // 3.016666...s
      if (durationInSeconds) {
        const durationInMilliseconds = (durationInSeconds - 0.5) * 1000
        setTimeout(() => lottieRef.current?.pause(), durationInMilliseconds)
      }
    }
  }, [verified])

  return (
    <section className={styles.container}>
      <p>
        Now check your email&apos;s inbox and click the link to verify your
        email!
      </p>
      {verified
        ? (
        <div>
          <Lottie lottieRef={lottieRef} animationData={Success} style={{ width: '350px' }} />
        </div>
          )
        : (
        <div>
          <Lottie animationData={Waiting} loop />
        </div>
          )}
    </section>
  )
}

export default VerifyEmailMessage
