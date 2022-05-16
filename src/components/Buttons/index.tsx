import React from 'react'

type Modals = 'change_pwd' | 'delete_acc'

interface Props {
  isEditing: boolean
  setFormState: () => void
  setModalState: () => void
  setModalOpened: (modalOpened: Modals | null) => void
}

const Buttons: React.FC<Props> = ({
  isEditing,
  setFormState,
  setModalOpened,
  setModalState
}) => {
  return (
    <>
      {!isEditing && (
        <button type="button" onClick={setFormState}>
          Update informations
        </button>
      )}
      {isEditing && <button type="submit">Save</button>}
      <button
        type="button"
        onClick={() => {
          setModalState()
          setModalOpened('change_pwd')
        }}
      >
        Change password
      </button>
      <button
        type="button"
        onClick={() => {
          setModalState()
          setModalOpened('delete_acc')
        }}
      >
        Delete account
      </button>
    </>
  )
}

export default Buttons
