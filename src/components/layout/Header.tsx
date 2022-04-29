import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import handleMobileMenu from '../../utils/handlers/handleMobileMenu'

import styles from '../../styles/Header.module.css'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <header className={styles.container}>
      <section className={styles.logo}>
        <div>
          <Image src="/icons/logo.svg" width={40} height={40} alt="Changix" />
        </div>
      </section>
      <nav className={styles.navigation}>
        <div
          className={styles.burguer}
          onClick={() => handleMobileMenu(setIsMenuOpen)}
        >
          <span
            className={`${styles.first} ${isMenuOpen && styles.close_left}`}
          ></span>
          <span
            className={`${styles.second} ${isMenuOpen && styles.close_right}`}
          ></span>
          <span
            className={`${styles.third} ${isMenuOpen && styles.fade}`}
          ></span>
        </div>

        <ul
          className={`${styles.navigation_items} ${
            isMenuOpen && styles.navigation_items_active
          }`}
        >
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
