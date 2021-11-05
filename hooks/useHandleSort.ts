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

type Params<Item> = {
  queryValue: string
  secondOrderByValue: string
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
}

export const useHandleSort = <Item extends CreatedAt>({
  queryValue,
  secondOrderByValue,
  setItems,
}: Params<Item>) => {
  const [sortingValue, setSortingValue] = React.useState('')
  const { setStatus } = useLoadingStore()

  React.useEffect(() => {
    if (sortingValue === '') {
      return
    }

    const getSortedItems = async () => {
      setStatus('loading')
      const itemsQuery = query<Item>(
        collectionGroup(firebaseDb, queryValue) as CollectionReference<Item>,
        sortingValue === 'Claps'
          ? orderBy('clapCount', 'desc')
          : orderBy(secondOrderByValue, 'desc')
      )

      const items = (await getDocs<Item>(itemsQuery)).docs.map(dataToJSON)

      setItems(items)
      setStatus('success')
    }

    getSortedItems()
  }, [queryValue, secondOrderByValue, setItems, setStatus, sortingValue])

  return { setSortingValue }
}
