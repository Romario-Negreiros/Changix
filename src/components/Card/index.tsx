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
        <Carousel showThumbs={false}>
          <div>
            <Image
              src="/images/landing_page.png"
              width="400px"
              height="300px"
              alt="i hate this component"
            />
          </div>
          <div>
            <Image
              src="/images/453.jpg"
              width="400px"
              height="300px"
              alt="i hate this component"
            />
          </div>
        </Carousel>
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
