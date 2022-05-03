import React from 'react'

import { DatalistInput, Card } from '../components'

import styles from '@styles/Home.module.css'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <main className={styles.container}>
      <section className={styles.input_container}>
        <DatalistInput />
        <select>
          <option value="" disabled selected>
            Select a category
          </option>
          <option value="sports">Sports</option>
          <option value="musical_instrument">Musical Instrument</option>
        </select>
        <button>Clear</button>
      </section>
      <article className={styles.results_container}>
        <h1>Showing results for: auhsuahsuahsuash</h1> <br />
        <h1>Using filter filter</h1>
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
