import React from 'react'

import { Error, Loader, Card } from '..'

import styles from '@styles/pages/Home.module.css'

import type { Item } from '@app/types/item'

interface Props {
  error: string
  isLoadingSearchQuery: boolean
  items: Item[]
}

const HomeQueryState: React.FC<Props> = ({
  error,
  isLoadingSearchQuery,
  items
}) => {
  if (isLoadingSearchQuery) {
    return (
      <div className={styles.fullContainer}>
        <Loader notFullScreen />
      </div>
    )
  } else if (error) {
    return (
      <div className={styles.fullContainer}>
        <Error title="Oooops!" error={error} notFullScreen />
      </div>
    )
  }
  return (
    <ul className={styles.results_list}>
      {items.map(item => (
        <Card
          key={item.id}
          item={item}
          linkHref={`/items/${item.id}`}
          linkTxt="Visit"
        />
      ))}
    </ul>
  )
}

export default HomeQueryState
