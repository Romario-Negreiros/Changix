import React from 'react'

import { handlePwdVisibility } from '@utils/handlers'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import formStyles from '@styles/components/Form.module.css'

import { faEye, faEyeSlash, faClose } from '@fortawesome/free-solid-svg-icons'

import type { SharedProps } from '@app/types/modals'
import type { VisiblePwds } from '@app/types/global'

interface Props extends SharedProps {}

const ChangePassword: React.FC<Props> = ({ setModalState }) => {
  const [visiblePwds, setVisiblePwds] = React.useState<VisiblePwds[]>([])

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
        <section className={formStyles.input_container}>
          <label htmlFor="current_pwd">Current Password</label>
          <div>
            <FontAwesomeIcon
              onClick={() =>
                handlePwdVisibility('current_pwd', visiblePwds, setVisiblePwds)
              }
              className={formStyles.icon}
              icon={visiblePwds.includes('current_pwd') ? faEyeSlash : faEye}
            />
            <input
              type={visiblePwds.includes('current_pwd') ? 'text' : 'password'}
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
