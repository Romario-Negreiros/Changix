import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Lottie from 'lottie-react'

import styles from '@styles/pages/SignIn.module.css'
import formStyles from '@styles/components/Form.module.css'

import Bubbles from '@public/animations/bubbles.json'

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import type { NextPage } from 'next'

const SignIn: NextPage = () => {
  const [isPwdVisible, setIsPwdVisible] = React.useState(false)

  const changePwdVisibility = () => setIsPwdVisible(!isPwdVisible)

  return (
    <main className="container">
      <div className={styles.bubbles} style={{ left: '0px' }}>
        <Lottie animationData={Bubbles} loop />
      </div>
      <form className={formStyles.form} style={{ maxWidth: '500px' }}>
        <section className={formStyles.input_container}>
          <label htmlFor="email">Email</label>
          <input id="email" />
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="pwd">Password</label>
          <div>
            <FontAwesomeIcon
              onClick={changePwdVisibility}
              className={formStyles.icon}
              icon={isPwdVisible ? faEyeSlash : faEye}
            />
            <input type={isPwdVisible ? 'text' : 'password'} id="pwd" />
          </div>
        </section>
        <button type="submit" style={{ maxWidth: '300px' }}>
          Sign in
        </button>
      </form>
      <div className={styles.bubbles} style={{ right: '0px' }}>
        <Lottie animationData={Bubbles} loop />
      </div>
    </main>
  )
}

export default SignIn
