import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Lottie from 'lottie-react'

import styles from '@styles/Form.module.css'
import styles2 from '@styles/SignIn.module.css'

import Bubbles from '@public/animations/bubbles.json'

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import type { NextPage } from 'next'

const SignIn: NextPage = () => {
  const [isPwdVisible, setIsPwdVisible] = React.useState(false)

  const changePwdVisibility = () => setIsPwdVisible(!isPwdVisible)

  return (
    <main className="container">
      <div className={styles2.bubbles} style={{ left: '0px' }}>
        <Lottie animationData={Bubbles} loop />
      </div>
      <form className={styles.form} style={{ maxWidth: '500px' }}>
        <section className={styles.input_container}>
          <label htmlFor="email">Email</label>
          <input id="email" />
        </section>
        <section className={styles.input_container}>
          <label htmlFor="pwd">Password</label>
          <div>
            <FontAwesomeIcon
              onClick={changePwdVisibility}
              className={styles.icon}
              icon={isPwdVisible ? faEyeSlash : faEye}
            />
            <input type={isPwdVisible ? 'text' : 'password'} id="pwd" />
          </div>
        </section>
        <button type="submit" style={{ maxWidth: '300px' }}>
          Sign in
        </button>
      </form>
      <div className={styles2.bubbles} style={{ right: '0px' }}>
        <Lottie animationData={Bubbles} loop />
      </div>
    </main>
  )
}

export default SignIn
