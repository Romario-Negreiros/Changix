import React from 'react'

import { handlePwdVisibility } from '@utils/handlers'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import formStyles from '@styles/components/Form.module.css'

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import type { NextPage } from 'next'
import type { VisiblePwds } from '@app/types/global'

const ResetPassword: NextPage = () => {
  const [visiblePwds, setVisiblePwds] = React.useState<VisiblePwds[]>([])

  return (
    <main className="container">
      <form className={formStyles.form}>
        <section className={formStyles.input_container}>
          <label htmlFor="pwd">New Password</label>
          <div>
            <FontAwesomeIcon
              onClick={() =>
                handlePwdVisibility('new_pwd', visiblePwds, setVisiblePwds)
              }
              className={formStyles.icon}
              icon={visiblePwds.includes('new_pwd') ? faEyeSlash : faEye}
            />
            <input
              type={visiblePwds.includes('new_pwd') ? 'text' : 'password'}
              id="pwd"
            />
          </div>
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="confirm_new_pwd">Confirm New Password</label>
          <div>
            <FontAwesomeIcon
              onClick={() =>
                handlePwdVisibility(
                  'confirm_new_pwd',
                  visiblePwds,
                  setVisiblePwds
                )
              }
              className={formStyles.icon}
              icon={
                visiblePwds.includes('confirm_new_pwd') ? faEyeSlash : faEye
              }
            />
            <input
              type={
                visiblePwds.includes('confirm_new_pwd') ? 'text' : 'password'
              }
              id="confirm_new_pwd"
            />
          </div>
        </section>
        <button type="submit">Reset</button>
      </form>
    </main>
  )
}

export default ResetPassword
