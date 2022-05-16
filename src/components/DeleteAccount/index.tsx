import React from 'react'

import { CloseModal } from '../'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import formStyles from '@styles/components/Form.module.css'

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import type { SharedProps } from '@app/types/modals'

interface Props extends SharedProps {}

const DeleteAccount: React.FC<Props> = ({ setModalState }) => {
  const [isPwdVisible, setIsPwdVisible] = React.useState(false)

  const changePwdVisibility = () => setIsPwdVisible(!isPwdVisible)

  return (
    <main className="modal_container">
      <form className={formStyles.form}>
        <CloseModal setModalState={setModalState} />
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
        <button type="submit" style={{ backgroundColor: 'red' }}>Delete</button>
      </form>
    </main>
  )
}

export default DeleteAccount
