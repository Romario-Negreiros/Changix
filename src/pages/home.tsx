import React from 'react'

import { useForm } from 'react-hook-form'
import { debounce, throttle } from '@utils/general'
import { useFirestore, useSearch } from '@utils/hooks'

import { HomeQueryState } from '../components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from '@styles/pages/Home.module.css'

import { faClose } from '@fortawesome/free-solid-svg-icons'

import type { GetServerSideProps, NextPage } from 'next'
import { Item, CategoriesEnum } from '@app/types/item'

interface Props {
  initialItems: Item[]
}

interface Fields {
  search: string
  filter: CategoriesEnum
}

const selectOptions = ['', 'Sports', 'Musical Instruments']

export const getServerSideProps: GetServerSideProps = async () => {
  const firestoreFunctions = useFirestore
  const { getDocs } = firestoreFunctions()

  const results = await getDocs(['announced'], ['ownerId', '!=', ''], 25)
  const initialItems: Item[] = []
  results.forEach(result => {
    if (result.exists()) {
      initialItems.push({
        id: result.id,
        ...(result.data() as Omit<Item, 'id'>)
      })
    }
  })

  return {
    props: {
      initialItems
    }
  }
}

const Home: NextPage<Props> = ({ initialItems }) => {
  const [error, setError] = React.useState('')
  const [isLoaded, setIsLoaded] = React.useState(true)
  const [items, setItems] = React.useState<Item[]>(initialItems)
  const [limitOfItems, setLimitOfItems] = React.useState(1)
  const { getDocs } = useFirestore()
  const { search, filter, searchAndFilter } = useSearch()
  const { register, watch, setValue } = useForm<Fields>()
  const watchSearch = watch('search')
  const watchFilter = watch('filter')

  const handleQuery = async (
    value: Partial<Fields>,
    isScrollQuery?: boolean,
    limitOfItems?: number
  ) => {
    try {
      if (error) setError('')
      if (!isScrollQuery) {
        setIsLoaded(false)
        setLimitOfItems(1)
      }
      if (value.search) {
        if (value.filter) {
          const results = await searchAndFilter(value.search, value.filter, limitOfItems)
          setItems(results)
          return
        }
        const results = await search(value.search, limitOfItems)
        setItems(results)
        return
      } else if (value.filter) {
        const results = await filter(value.filter, limitOfItems)
        setItems(results)
        return
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message)
    } finally {
      setIsLoaded(true)
    }
  }

  const handleQueryWithDebounce = debounce(
    (value: Partial<Fields>, isScrollQuery?: boolean, limitOfItems?: number) =>
      handleQuery(value, isScrollQuery, limitOfItems)
  )

  const handleScroll = throttle(() => {
    const documentHeight = document.body.scrollHeight
    const currentScroll = window.scrollY + window.innerHeight
    if (
      currentScroll === documentHeight &&
      (watchSearch || watchFilter)
    ) {
      setLimitOfItems(limitOfItems + 2)
      handleQueryWithDebounce(
        {
          search: watchSearch,
          filter: watchFilter
        },
        true,
        limitOfItems + 2
      )
    }
  })

  React.useEffect(() => {
    if (!items.length) {
      setError('No results found!')
    }
  }, [items])

  React.useEffect(() => {
    const subscription = watch(async value => handleQueryWithDebounce(value))
    document.addEventListener('scroll', handleScroll)

    return () => {
      subscription.unsubscribe()
      document.removeEventListener('scroll', handleScroll)
    }
  }, [
    watch,
    getDocs,
    search,
    filter,
    searchAndFilter,
    handleQueryWithDebounce,
    handleScroll
  ])

  return (
    <main className={styles.container}>
      <section>
        <div className={styles.search_container}>
          <label htmlFor="search">Search for item name</label>
          <div className={styles.input_wrapper}>
            <input id="search" {...register('search')} />
            <div className={styles.clear_input}>
              {watchSearch && (
                <FontAwesomeIcon
                  onClick={() => setValue('search', '')}
                  icon={faClose}
                  color="#8661c1"
                  width={25}
                  height={25}
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.filter_container}>
          <label htmlFor="filter">Filter by category</label>
          <select id="filter" placeholder="None" {...register('filter')}>
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
          Showing results for: {watchSearch} <br />
          Using filter: {watchFilter}
        </h1>
        <HomeQueryState error={error} isLoaded={isLoaded} items={items} />
      </article>
    </main>
  )
}

export default Home
