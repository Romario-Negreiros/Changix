import { useFirestore } from '.'

import type { Item, CategoriesEnum } from '@app/types/item'

const useSearch = () => {
  const { getDocs } = useFirestore()

  const search = async (searchValue: string, limitOfItems: number) => {
    const results = await getDocs(['announced'], ['ownerId', '!=', ''], limitOfItems * 2)
    const filteredResults: Item[] = []
    results.forEach(doc => {
      const item = doc.data() as Omit<Item, 'id'>
      if (filteredResults.length < limitOfItems) {
        if (item.name.toLowerCase().includes(searchValue.toLowerCase())) {
          filteredResults.push({
            id: doc.id,
            ...item
          })
        }
      }
    })
    return filteredResults
  }

  const filter = async (filterValue: CategoriesEnum, limitOfItems: number) => {
    const results = await getDocs(
      ['announced'],
      ['category', '==', filterValue],
      100
    )
    const filteredResults: Item[] = []
    results.forEach(doc => {
      const item = doc.data() as Omit<Item, 'id'>
      if (filteredResults.length < limitOfItems) {
        filteredResults.push({
          id: doc.id,
          ...item
        })
      }
    })
    return filteredResults
  }

  const searchAndFilter = async (
    searchValue: string,
    filterValue: CategoriesEnum,
    limitOfItems: number
  ) => {
    const results = await getDocs(
      ['announced'],
      ['category', '==', filterValue],
      100
    )
    const filteredResults: Item[] = []
    results.forEach(doc => {
      const item = doc.data() as Omit<Item, 'id'>
      if (filteredResults.length < limitOfItems) {
        if (item.name.toLowerCase().includes(searchValue.toLowerCase())) {
          filteredResults.push({
            id: doc.id,
            ...item
          })
        }
      }
    })
    return filteredResults
  }

  return {
    search,
    searchAndFilter,
    filter
  }
}

export default useSearch
