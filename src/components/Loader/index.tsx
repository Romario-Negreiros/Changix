import React from 'react'

import Lottie from 'lottie-react'

import LoadingAnimation from '@public/animations/loader.json'

const Loader: React.FC = () => {
  return (
    <main className="container">
      <section style={{ width: '25%' }}>
        <Lottie animationData={LoadingAnimation} loop />
      </section>
    </main>
  )
}

export default Loader
