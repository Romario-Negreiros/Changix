import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from '@styles/modals/ImagesUpdater.module.css'
import formStyles from '@styles/components/Form.module.css'

import { faCamera, faClose } from '@fortawesome/free-solid-svg-icons'

interface Props {
  setModalState: () => void
}

const ImagesUpdater: React.FC<Props> = ({ setModalState }) => {
  return (
    <main className={styles.container}>
      <form className={formStyles.form}>
      <div className="close_modal" onClick={setModalState}>
        <FontAwesomeIcon icon={faClose} color="red" width={50} height={50} />
      </div>
        {new Array(6).fill(1).map((value, index) => (
        <section key={value * index} className={formStyles.file_input_container}>
          <label className={formStyles.item_image_label}>
            <FontAwesomeIcon
              icon={faCamera}
              color="#8661c1"
              height={25}
              width={25}
            />
            <input type="file" accept=".jpg,.jpeg,.png,.svg" />
          </label>
          <div className={styles.image_options_container}>
            <button>Change</button>
            <button style={{ backgroundColor: 'red' }}>Delete</button>
            <button style={{ backgroundColor: 'orange' }}>Discard changes</button>
          </div>
        </section>
        ))}
        <button type="submit">Save</button>
      </form>
    </main>
  )
}

export default ImagesUpdater
