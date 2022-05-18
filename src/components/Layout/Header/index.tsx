import React from 'react'

import { useAuth } from '@utils/hooks'

import Image from 'next/image'
import Link from 'next/link'

import handleMobileMenu from '@utils/handlers/handleMobileMenu'

import styles from '@styles/components/Header.module.css'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const { user, signOut } = useAuth()

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
            <Link href="/announce">
              <a>Announce</a>
            </Link>
          </li>
          {!user && (
            <>
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
            </>
          )}
          {user && (
            <>
              <li>
                <Link href={`/users/${user.uid}`}>
                  <a>Profile</a>
                </Link>
              </li>
              <li onClick={signOut}>
                <Link href="/sign_in">
                  <a>Sign out</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
