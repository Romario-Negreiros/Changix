import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faClose } from '@fortawesome/free-solid-svg-icons'

import { SharedProps } from '@app/types/modals'

interface Props extends SharedProps {}

const CloseModal: React.FC<Props> = ({ setModalState }) => {
  return (
    <div className="close_modal" onClick={setModalState}>
      <FontAwesomeIcon icon={faClose} color="red" width={50} height={50} />
    </div>
  )
}

export default CloseModal
