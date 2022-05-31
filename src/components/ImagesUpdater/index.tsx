import React from 'react'

import { handleFileSelection } from '@utils/handlers'

import { CloseModal } from '..'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from '@styles/modals/ImagesUpdater.module.css'
import formStyles from '@styles/components/Form.module.css'

import { faCamera } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

import type { SharedProps } from '@app/types/modals'
import type { FormFields } from '@app/types/item'
import { UseFormRegister, UseFormResetField } from 'react-hook-form'

interface Props extends SharedProps {
  register: UseFormRegister<FormFields>
  resetField: UseFormResetField<FormFields>
  imagesPreviews: any
  setImagesPreviews: (callback: (oldImagesPreviews: any) => void) => void
  defaultImagesValues: string[]
}

const ImagesUpdater: React.FC<Props> = ({
  setModalState,
  register,
  resetField,
  imagesPreviews,
  setImagesPreviews,
  defaultImagesValues
}) => {
  const getInputRegisterName = (index: number) => {
    switch (index) {
      case 0:
        return 'image0'
      case 1:
        return 'image1'
      case 2:
        return 'image2'
      case 3:
        return 'image3'
      case 4:
        return 'image4'
      default:
        return 'image5'
    }
  }

  const clearOneField = (index: number) => {
    setImagesPreviews(oldImagesPreviews => {
      return {
        ...oldImagesPreviews,
        [getInputRegisterName(index)]: ''
      }
    })
    resetField(getInputRegisterName(index))
  }

  const clearAllFields = () => {
    setImagesPreviews(() => {
      return {}
    })
    for (let img = 0; img < 6; img++) {
      resetField(getInputRegisterName(img))
    }
  }

  return (
    <main className="modal_container">
      <section className={formStyles.form}>
        <h1>
          Click on the image to change the current one, or on the camera to add
          a new one.
        </h1>
        <CloseModal setModalState={setModalState} />
        {new Array(6).fill(1).map((_, index) => (
          <section
            key={`input#${index}`}
            className={formStyles.file_input_container}
          >
            <label className={formStyles.item_image_label}>
              {defaultImagesValues[index] &&
                !imagesPreviews[`image${index}`] && (
                  <Image
                    src={defaultImagesValues[index]}
                    width={300}
                    height={200}
                    alt="item"
                  />
              )}
              {imagesPreviews[`image${index}`] && (
                <Image
                  src={imagesPreviews[`image${index}`]}
                  width={300}
                  height={200}
                  alt={`img preview ${index}`}
                />
              )}
              {!defaultImagesValues[index] &&
                !imagesPreviews[`image${index}`] && (
                  <FontAwesomeIcon
                    icon={faCamera}
                    color="#8661c1"
                    height={25}
                    width={25}
                  />
              )}
              <input
                type="file"
                accept="image/*"
                {...register(getInputRegisterName(index), {
                  onChange: e =>
                    handleFileSelection(e, undefined, index, setImagesPreviews)
                })}
              />
            </label>
            <div className={styles.image_options_container}>
              <button onClick={() => clearOneField(index)}type="button" style={{ backgroundColor: 'red' }}>Delete</button>
            </div>
          </section>
        ))}
        <button onClick={clearAllFields} type="button" style={{ backgroundColor: 'orange' }}>
          Discard changes
        </button>
      </section>
    </main>
  )
}

export default ImagesUpdater
