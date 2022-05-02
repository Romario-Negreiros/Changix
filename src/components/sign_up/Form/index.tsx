import React from 'react'

import styles from '@styles/Form.module.css'

const Form: React.FC = () => {
  return (
    <form className={styles.form}>
      <section className={styles.file_input_container}>
        <label>
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
        <input id="pwd" />
      </section>
      <section className={styles.input_container}>
        <label htmlFor="confirmd_pwd">Confirm Password</label>
        <input id="confirm_pwd" />
      </section>
      <section className={styles.input_container}>
        <label htmlFor="country">Country</label>
        <input id="country" />
      </section>
      <section className={styles.input_container}>
        <label htmlFor="phone_number">Phone number</label>
        <input id="phone_number" />
      </section>
      <button>Submit</button>
    </form>
  )
}

export default Form
