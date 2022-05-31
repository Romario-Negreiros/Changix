import React from 'react'

import Image from 'next/image'

interface Props {
  images: string[]
}

const CarouselImages: React.FC<Props> = ({ images }) => {
  return (
    <>
      {images.map((img, index) => (
        <div key={img}>
          <Image
            src={img}
            width={400}
            height={300}
            alt={`img#${index}`}
          />
        </div>
      ))}
    </>
  )
}

export default CarouselImages
