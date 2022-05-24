import React from 'react'

import Lottie from 'lottie-react'

import LoadingAnimation from '@public/animations/loader.json'

interface Props {
  isModal?: boolean
  notFullScreen?: boolean
}

const sectionStylesInModal = {
  width: '50%',
  padding: '1rem',
  backgroundColor: '#fff'
}

const notFullScreenSectionStyles = {
  width: '40%',
  margin: 'auto'
}

const Loader: React.FC<Props> = ({ isModal, notFullScreen }) => {
  if (notFullScreen) {
    return (
      <section style={notFullScreenSectionStyles} >
        <Lottie animationData={LoadingAnimation} loop />
      </section>
    )
  }
  return (
    <main className={isModal ? 'modal_container' : 'container'}>
      <section style={isModal ? sectionStylesInModal : { width: '50%' }}>
        <Lottie animationData={LoadingAnimation} loop />
      </section>
    </main>
  )
}

export default Loader
