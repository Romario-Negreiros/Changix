import React from 'react'

// import { Card } from '../components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from '@styles/pages/Home.module.css'

import { faClose } from '@fortawesome/free-solid-svg-icons'

import type { NextPage } from 'next'

const selectOptions = ['Any', 'Sports', 'Musical Instruments']

const Home: NextPage = () => {
  return (
    <main className={styles.container}>
      <section>
        <div className={styles.search_container}>
          <label htmlFor="search">Search for item name</label>
          <div className={styles.input_wrapper}>
            <input id="search" />
            <div className={styles.clear_input}>
              <FontAwesomeIcon icon={faClose} color="#8661c1" width={25} height={25} />
            </div>
          </div>
        </div>
        <div className={styles.filter_container}>
          <label htmlFor="filter">Filter by category</label>
          <select id="filter">
            {selectOptions.map((option, index) => (
              <option key={index} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </section>
      <article className={styles.results_container}>
        <h1>
          Showing results for: auhsuahsuahsuash <br />
          Using filter filter
        </h1>
        <ul>
          {/* {new Array(50).fill(1).map((value, index) => (
            <Card key={value * index} linkHref="/items/:category/:itemId" />
          ))} */}
        </ul>
      </article>
    </main>
  )
}

export default Home
