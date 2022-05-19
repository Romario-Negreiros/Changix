import React from 'react'

import { Carousel } from 'react-responsive-carousel'

import Image from 'next/image'
import Link from 'next/link'

import styles from '@styles/components/Card.module.css'

interface Props {
  linkHref: string
}

const mockTxt = `
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto
        omnis quasi, repudiandae quas recusandae fuga aliquam eum consectetur
        placeat. Qui, eos est. Repudiandae doloremque incidunt sint a excepturi.
        Officiis tempora, fugiat eligendi sit laboriosam corporis pariatur
        adipisci. Non eaque, corporis possimus quibusdam officia debitis,
        doloribus dolore cupiditate mollitia voluptatibus quisquam corrupti
        facere sint omnis inventore itaque blanditiis tenetur cum illo aut
        molestiae suscipit placeat sunt nihil? Voluptate distinctio veritatis
        commodi facilis. Nobis nesciunt odit fuga qui eos error in ad magni
        dolor delectus! Perspiciatis a nulla similique repellat iure ea quam cum
        nihil id consequuntur pariatur vero corporis, animi voluptatum nemo?
        Error quidem rerum earum! Omnis enim, id accusamus, vitae, fugiat
        inventore distinctio quaerat modi ipsam amet reprehenderit magni
        laboriosam.
`

const Card: React.FC<Props> = ({ linkHref }) => {
  return (
    <li className={styles.result}>
      <h2>item.name</h2>
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
      <p>{mockTxt.substring(0, 150)}...</p>
      <Link href={linkHref}>
        <a>Visit</a>
      </Link>
    </li>
  )
}

export default Card
