import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from '@styles/Form.module.css'

import { faCamera, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

type TVisiblePwd = ('pwd' | 'confirm_pwd')[]

const Form: React.FC = () => {
  const [visiblePwd, setVisiblePwd] = React.useState<TVisiblePwd>([])

  const handlePwdVisibility = (key: 'pwd' | 'confirm_pwd') => {
    if (visiblePwd.includes(key)) {
      setVisiblePwd(oldVisiblePwds =>
        oldVisiblePwds.filter(visiblePwd => visiblePwd !== key)
      )
    } else {
      setVisiblePwd([...visiblePwd, key])
    }
  }

  return (
    <form className={styles.form}>
      <section className={styles.file_input_container}>
        <label>
          <FontAwesomeIcon
            icon={faCamera}
            color="#8661c1"
            height={25}
            width={25}
          />
          <input type="file" accept=".jpg,.jpeg,.png,.svg" />
        </label>
      </section>
      <section className={styles.input_container}>
        <label htmlFor="email">Email</label>
        <input id="email" />
      </section>
      <section className={styles.input_container}>
        <label htmlFor="name">Name</label>
        <input id="name" />
      </section>
      <section className={styles.input_container}>
        <label htmlFor="pwd">Password</label>
        <div>
          <FontAwesomeIcon
            onClick={() => handlePwdVisibility('pwd')}
            className={styles.icon}
            icon={visiblePwd.includes('pwd') ? faEyeSlash : faEye}
          />
          <input
            type={visiblePwd.includes('pwd') ? 'text' : 'password'}
            id="pwd"
          />
        </div>
      </section>
      <section className={styles.input_container}>
        <label htmlFor="confirmd_pwd">Confirm Password</label>
        <div>
          <FontAwesomeIcon
            onClick={() => handlePwdVisibility('confirm_pwd')}
            className={styles.icon}
            icon={visiblePwd.includes('confirm_pwd') ? faEyeSlash : faEye}
          />
          <input
            type={visiblePwd.includes('confirm_pwd') ? 'text' : 'password'}
            id="confirm_pwd"
          />
        </div>
      </section>
      <section className={styles.input_container}>
        <label htmlFor="country">Country</label>
        <input id="country" />
      </section>
      <section className={styles.input_container}>
        <label htmlFor="phone_number">Phone number</label>
        <input id="phone_number" />
      </section>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Form
