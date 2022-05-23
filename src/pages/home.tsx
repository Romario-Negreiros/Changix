import React from 'react'

import { useForm } from 'react-hook-form'
import { debounce } from '@utils/general'
import { useFirestore, useSearch } from '@utils/hooks'

import { HomeQueryState, Loader } from '../components'

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
  const [loadersState, setLoadersState] = React.useState({
    isLoadingSearchQuery: false,
    isLoadingScrollQuery: false
  })
  const [items, setItems] = React.useState<Item[]>(initialItems)
  const { getDocs } = useFirestore()
  const { search, filter, searchAndFilter } = useSearch()
  const { register, watch, setValue } = useForm<Fields>()
  const watchSearch = watch('search')
  const watchFilter = watch('filter')

  React.useEffect(() => {
    if (!items.length) {
      setError('No results found!')
    }
  }, [items])

  const handleQuery = async (value: Partial<Fields>) => {
    try {
      setLoadersState({
        isLoadingScrollQuery: false,
        isLoadingSearchQuery: true
      })
      if (value.search) {
        if (value.filter) {
          const results = await searchAndFilter(value.search, value.filter)
          setItems(results)
          return
        }
        const results = await search(value.search)
        setItems(results)
        return
      } else if (value.filter) {
        const results = await filter(value.filter)
        setItems(results)
        console.log(value.filter)
        return
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message)
    } finally {
      setLoadersState({
        isLoadingScrollQuery: false,
        isLoadingSearchQuery: false
      })
    }
  }

  const handleQueryWithDebounce = debounce((value: Partial<Fields>) =>
    handleQuery(value)
  )

  React.useEffect(() => {
    const subscription = watch(async value => handleQueryWithDebounce(value))

    return () => subscription.unsubscribe()
  }, [watch, getDocs, search, filter, searchAndFilter, handleQueryWithDebounce])

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
        <HomeQueryState
          error={error}
          isLoadingSearchQuery={loadersState.isLoadingSearchQuery}
          items={items}
        />
        {loadersState.isLoadingScrollQuery && (
          <div className={styles.scrollContainer}>
            <Loader notFullScreen />
          </div>
        )}
      </article>
    </main>
  )
}

export default Home
