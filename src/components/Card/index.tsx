import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import styles from '@styles/components/Card.module.css'

interface Props {
  linkHref: string
}

const Card: React.FC<Props> = ({ linkHref }) => {
  return (
    <li className={styles.result}>
      <section className={styles.user_container}>
        <div>
          <Image
            loading="lazy"
            src="/icons/logo.svg"
            width={50}
            height={50}
            alt="item.owner.name"
          />
        </div>
        <h2>item.owner.name</h2>
      </section>
      <section className={styles.item_image_container}>
        <Image
          src="/images/453.jpg"
          width="400px"
          height="250px"
          alt="book"
        />
      </section>
      <Link href={linkHref}>
        <a>Visit</a>
      </Link>
    </li>
  )
}

export default Card