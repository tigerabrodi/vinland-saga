import {
  collectionGroup,
  CollectionReference,
  getDocs,
  orderBy,
  query,
} from '@firebase/firestore'
import { firebaseDb } from '@lib/firebase/firebase'
import { dataToJSON } from '@lib/firebase/format-utils'
import { useLoadingStore } from '@lib/store'
import { CreatedAt } from '@lib/types'
import * as React from 'react'

type Params = {
  queryValue: string
  secondOrderByValue: string
}

export const useHandleSort = <Item extends CreatedAt>({
  queryValue,
  secondOrderByValue,
}: Params) => {
  const [sortedItems, setSortedItems] = React.useState<Item[] | null>(null)
  const [sortingValue, setSortingValue] = React.useState('')
  const { setStatus } = useLoadingStore()

  React.useEffect(() => {
    if (sortingValue === '') {
      return
    }

    const setItems = async () => {
      setStatus('loading')
      const itemsQuery = query<Item>(
        collectionGroup(firebaseDb, queryValue) as CollectionReference<Item>,
        sortingValue === 'Claps'
          ? orderBy('clapCount', 'desc')
          : orderBy(secondOrderByValue, 'desc')
      )

      const items = (await getDocs<Item>(itemsQuery)).docs.map(dataToJSON)

      setSortedItems(items)
      setStatus('success')
    }

    setItems()
  }, [queryValue, secondOrderByValue, setStatus, sortingValue])

  return { sortedItems, setSortingValue }
}
