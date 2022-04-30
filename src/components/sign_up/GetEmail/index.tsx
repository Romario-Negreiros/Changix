import React from 'react'

import styles from '@styles/GetEmail.module.css'

const GetEmail: React.FC = () => {
  return (
    <form className={styles.form}>
      <p>
        First, add your email address, a verification link will be sent after
        you click the submit button. <br />
        Check your inbox and click on the link received to verify the email
        address. The email might take some minutes to arrive.
      </p>
      <input />
      <button type="submit">Submit</button>
    </form>
  )
}

export default GetEmail
