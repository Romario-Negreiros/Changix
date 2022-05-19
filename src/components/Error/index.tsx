import React from 'react'

import Lottie from 'lottie-react'

import errorAnimation from '@public/animations/error.json'

import styles from '@styles/components/Error.module.css'

interface Props {
  title: string
  error: string
  btn?: {
    handleClick: () => void
    text: string
  }
  animation?: any
  width?: string
  isModal?: boolean
}

const Error: React.FC<Props> = ({ title, error, btn, animation, width, isModal }) => {
  return (
    <main className={`${styles.container} ${isModal && 'modal_container'}`}>
      <section className={isModal ? styles.sectionInModal : ''}>
        <h1>{title}</h1>
        <div style={!animation ? { width: '55%' } : width ? { width } : undefined}>
          <Lottie animationData={animation ?? errorAnimation} loop />
        </div>
        <p>{error}</p>
        {btn && <button onClick={btn.handleClick}>{btn.text}</button>}
      </section>
    </main>
  )
}

export default Error
