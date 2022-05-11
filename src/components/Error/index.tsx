import React from 'react'

import Lottie from 'lottie-react'

import errorAnimation from '@public/animations/error.json'

import styles from '@styles/components/Error.module.css'

interface Props {
  title: string
  error: string
  btn: {
    handleClick: () => void
    text: string
  }
  animation?: any
  container?: Boolean
}

const Error: React.FC<Props> = ({ title, error, btn, animation }) => {
  return (
    <main className={styles.container}>
      <section>
        <h1>{title}</h1>
        <div style={!animation ? { width: '55%' } : undefined}>
          <Lottie animationData={animation ?? errorAnimation} loop />
        </div>
        <p>{error}</p>
        <button onClick={btn.handleClick}>{btn.text}</button>
      </section>
    </main>
  )
}

export default Error
