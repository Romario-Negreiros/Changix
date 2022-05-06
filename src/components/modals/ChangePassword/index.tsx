import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import formStyles from '@styles/components/Form.module.css'

import { faEye, faEyeSlash, faClose } from '@fortawesome/free-solid-svg-icons'

import type { SharedProps } from '../shared.types'

type TVisiblePwd = ('current_pwd' | 'new_pwd' | 'confirm_new_pwd')[]

interface Props extends SharedProps {}

const ChangePassword: React.FC<Props> = ({ setModalState }) => {
  const [visiblePwd, setVisiblePwd] = React.useState<TVisiblePwd>([])

  const handlePwdVisibility = (
    key: 'current_pwd' | 'new_pwd' | 'confirm_new_pwd'
  ) => {
    if (visiblePwd.includes(key)) {
      setVisiblePwd(oldVisiblePwds =>
        oldVisiblePwds.filter(visiblePwd => visiblePwd !== key)
      )
    } else {
      setVisiblePwd([...visiblePwd, key])
    }
  }

  return (
    <main className="modal_container">
      <form className={formStyles.form}>
        <div className="close_modal" onClick={setModalState}>
          <FontAwesomeIcon icon={faClose} color="red" width={50} height={50} />
        </div>
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
        <section className={formStyles.input_container}>
          <label htmlFor="current_pwd">Current Password</label>
          <div>
            <FontAwesomeIcon
              onClick={() => handlePwdVisibility('current_pwd')}
              className={formStyles.icon}
              icon={visiblePwd.includes('current_pwd') ? faEyeSlash : faEye}
            />
            <input
              type={visiblePwd.includes('current_pwd') ? 'text' : 'password'}
              id="current_pwd"
            />
          </div>
        </section>
        <button type="submit">Change</button>
      </form>
    </main>
  )
}

export default ChangePassword
