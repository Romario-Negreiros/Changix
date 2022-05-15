import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from '@styles/modals/ImagesUpdater.module.css'
import formStyles from '@styles/components/Form.module.css'

import { faCamera, faClose } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

import type { SharedProps } from '@app/types/modals'

interface Props extends SharedProps {}

const ImagesUpdater: React.FC<Props> = ({ setModalState }) => {
  return (
    <main className="modal_container">
      <form className={formStyles.form}>
        <h1>
          Click on the image to change the current one, or on the camera to add
          a new one.
        </h1>
        <div className="close_modal" onClick={setModalState}>
          <FontAwesomeIcon icon={faClose} color="red" width={50} height={50} />
        </div>
        {new Array(6).fill(1).map((value, index) => (
          <section
            key={value * index}
            className={formStyles.file_input_container}
          >
            <label className={formStyles.item_image_label}>
              {(value * index) % 2 === 0
                ? (
                <FontAwesomeIcon
                  icon={faCamera}
                  color="#8661c1"
                  height={25}
                  width={25}
                />
                  )
                : (
                <Image
                  src="/images/453.jpg"
                  width={300}
                  height={200}
                  alt="porra"
                />
                  )}
              <input type="file" accept=".jpg,.jpeg,.png,.svg" />
            </label>
            <div className={styles.image_options_container}>
              <button style={{ backgroundColor: 'red' }}>Delete</button>
              <button style={{ backgroundColor: 'orange' }}>
                Discard changes
              </button>
            </div>
          </section>
        ))}
        <button type="submit">Save</button>
      </form>
    </main>
  )
}

export default ImagesUpdater
