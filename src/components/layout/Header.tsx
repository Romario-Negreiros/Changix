import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import styles from '../../styles/Header.module.css'

const Header: React.FC = () => {
  return (
    <header className={styles.container}>
      <section className={styles.logo}>
        <div>
          <Image src="/icons/logo.svg" width={40} height={40} alt="Changix" />
        </div>
      </section>
      <nav className={styles.navigation}>
        <ul className={styles.navigation_items}>
          <li>
            <Link href="/home">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/sign_in">
              <a>Sign in</a>
            </Link>
          </li>
          <li>
            <Link href="/sign_up">
              <a>Sign up</a>
            </Link>
          </li>
          <li>
            <Link href="/users/:id">
              <a>Profile</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
