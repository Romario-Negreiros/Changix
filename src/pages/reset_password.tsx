import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import formStyles from '@styles/components/Form.module.css'

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import type { NextPage } from 'next'

type TVisiblePwd = ('new_pwd' | 'confirm_new_pwd')[]

const ResetPassword: NextPage = () => {
  const [visiblePwd, setVisiblePwd] = React.useState<TVisiblePwd>([])

  const handlePwdVisibility = (key: 'new_pwd' | 'confirm_new_pwd') => {
    if (visiblePwd.includes(key)) {
      setVisiblePwd(oldVisiblePwds =>
        oldVisiblePwds.filter(visiblePwd => visiblePwd !== key)
      )
    } else {
      setVisiblePwd([...visiblePwd, key])
    }
  }

  return (
    <main className="container">
      <form className={formStyles.form}>
        <section className={formStyles.input_container}>
          <label htmlFor="pwd">New Password</label>
          <div>
            <FontAwesomeIcon
              onClick={() => handlePwdVisibility('new_pwd')}
              className={formStyles.icon}
              icon={visiblePwd.includes('new_pwd') ? faEyeSlash : faEye}
            />
            <input
              type={visiblePwd.includes('new_pwd') ? 'text' : 'password'}
              id="pwd"
            />
          </div>
        </section>
        <section className={formStyles.input_container}>
          <label htmlFor="confirm_new_pwd">Confirm New Password</label>
          <div>
            <FontAwesomeIcon
              onClick={() => handlePwdVisibility('confirm_new_pwd')}
              className={formStyles.icon}
              icon={visiblePwd.includes('confirm_new_pwd') ? faEyeSlash : faEye}
            />
            <input
              type={
                visiblePwd.includes('confirm_new_pwd') ? 'text' : 'password'
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
