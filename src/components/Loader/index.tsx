import React from 'react'

import Lottie from 'lottie-react'

import LoadingAnimation from '@public/animations/loader.json'

interface Props {
  isModal?: boolean
}

const sectionStylesInModal = {
  width: '25%',
  padding: '1rem',
  backgroundColor: '#fff'
}

const Loader: React.FC<Props> = ({ isModal }) => {
  return (
    <main className={isModal ? 'modal_container' : 'container'}>
      <section style={isModal ? sectionStylesInModal : { width: '25%' }}>
        <Lottie animationData={LoadingAnimation} loop />
      </section>
    </main>
  )
}

export default Loader
