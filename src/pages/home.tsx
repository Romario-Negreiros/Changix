import React from 'react'

import { Card } from '../components'

import styles from '@styles/Home.module.css'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <main className={styles.container}>
      <section>
        <div className={styles.search_container}>
          <label htmlFor="search">Search for item name</label>
          <input id="search"/>
        </div>
        <div className={styles.filter_container}>
          <label htmlFor="filter">Filter by category</label>
          <select id="filter">
            <option value="any" selected>
              Any
            </option>
            <option value="sports">Sports</option>
            <option value="musical_instrument">Musical Instrument</option>
          </select>
        </div>
      </section>
      <article className={styles.results_container}>
        <h1>
          Showing results for: auhsuahsuahsuash <br />
          Using filter filter
        </h1>
        <ul>
          {new Array(50).fill(1).map((value, index) => (
            <Card key={value * index} />
          ))}
        </ul>
      </article>
    </main>
  )
}

export default Home
