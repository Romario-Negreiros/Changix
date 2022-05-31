import React from 'react'

import { Carousel } from 'react-responsive-carousel'

import Image from 'next/image'
import Link from 'next/link'

import styles from '@styles/components/Card.module.css'

import { Item } from '@app/types/item'

interface Props {
  item: Item
  linkHref: string
  linkTxt: string
}

const Card: React.FC<Props> = ({ item, linkHref, linkTxt }) => {
  return (
    <li className={styles.result}>
      <h2>{item.name}</h2>
      <section className={styles.item_image_container}>
        {item.images.length
          ? (
          <Carousel showThumbs={false}>
            {item.images.map((img, index) => (
              <div key={img}>
                <Image
                  src={img}
                  width={400}
                  height={300}
                  alt={`img#${index}`}
                />
              </div>
            ))}
          </Carousel>
            )
          : (
              <div className={styles.no_images}>
                <p>No images...</p>
              </div>
            )}
      </section>
      <p className={styles.description}>
        {item.description.substring(0, 150)}
        {item.description.length < 150 ? '' : '...'}
      </p>
      <Link href={linkHref}>
        <a>{linkTxt}</a>
      </Link>
    </li>
  )
}

export default Card
