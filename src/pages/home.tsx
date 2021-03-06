import React from 'react'

import { useForm } from 'react-hook-form'
import { debounce, throttle } from '@utils/general'
import { useFirestore, useSearch } from '@utils/hooks'
import { handleErrors } from '@utils/handlers'

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

const selectOptions = ['', 'Sports', 'Musical Instruments', 'Games', 'Toys']

export const getServerSideProps: GetServerSideProps = async () => {
  const firestoreFunctions = useFirestore
  const { getDocs } = firestoreFunctions()

  const results = await getDocs(['announced'], ['ownerId', '!=', ''], 15)
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
  const [limitOfItems, setLimitOfItems] = React.useState(15)
  const [hasFoundAllResults, setHasFoundAllResults] = React.useState(false)
  const { getDocs } = useFirestore()
  const { search, filter, searchAndFilter } = useSearch()
  const { register, watch, setValue } = useForm<Fields>()
  const watchSearch = watch('search')
  const watchFilter = watch('filter')

  const handleQuery = async (
    value: Partial<Fields>,
    limitOfItems: number,
    isScrollQuery?: boolean
  ) => {
    try {
      if (error) setError('')
      if (!isScrollQuery) {
        setIsLoaded(false)
        setLimitOfItems(15)
        if (hasFoundAllResults) setHasFoundAllResults(false)
      }
      if (value.search) {
        if (value.filter) {
          const results = await searchAndFilter(
            value.search,
            value.filter,
            limitOfItems
          )
          if (
            results.every(result =>
              items.some(item => item.id === result.id)
            ) &&
            results.length === items.length
          ) {
            setHasFoundAllResults(true)
            return
          }
          setItems(results)
          return
        }
        const results = await search(value.search, limitOfItems)
        if (
          results.every(result => items.some(item => item.id === result.id)) &&
          results.length === items.length
        ) {
          setHasFoundAllResults(true)
          return
        }
        setItems(results)
        return
      } else if (value.filter) {
        const results = await filter(value.filter, limitOfItems)
        if (
          results.every(result => items.some(item => item.id === result.id)) &&
          results.length === items.length
        ) {
          setHasFoundAllResults(true)
          return
        }
        setItems(results)
        return
      }
    } catch (err) {
      handleErrors(err, 'Load Announces', setError)
    } finally {
      setIsLoaded(true)
    }
  }

  const handleQueryWithDebounce = debounce(
    (value: Partial<Fields>, limitOfItems: number, isScrollQuery?: boolean) =>
      handleQuery(value, limitOfItems, isScrollQuery)
  )

  const handleScroll = throttle(
    () => {
      const documentHeight = document.body.scrollHeight
      const currentScroll = window.scrollY + window.innerHeight
      if (
        currentScroll + 30 >= documentHeight &&
        (watchSearch || watchFilter) &&
        !hasFoundAllResults
      ) {
        setLimitOfItems(limitOfItems + 15)
        handleQueryWithDebounce(
          {
            search: watchSearch,
            filter: watchFilter
          },
          limitOfItems + 15,
          true
        )
      }
    },
    100,
    true
  )

  React.useEffect(() => {
    if (!items.length) {
      setError('No results found!')
    }
  }, [items])

  React.useEffect(() => {
    const subscription = watch(async value =>
      handleQueryWithDebounce(value, limitOfItems)
    )
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
    handleScroll,
    limitOfItems
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
