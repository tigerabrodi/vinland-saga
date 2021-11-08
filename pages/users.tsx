import * as React from 'react'
import { Feed } from '@components/Feed'
import { UserItem } from '@components/UserItem'
import {
  collection,
  CollectionReference,
  getDocs,
  orderBy,
  query,
} from '@firebase/firestore'
import { firebaseDb } from '@lib/firebase/firebase'
import { dataToJSON } from '@lib/firebase/format-utils'
import { UserProfile } from '@lib/types'
import type { NextPage } from 'next'
import { List } from './usersStyles'
import { useHandleSort } from '@hooks/useHandleSort'

export async function getServerSideProps() {
  const chefsQuery = query(
    collection(firebaseDb, 'chefs') as CollectionReference<UserProfile>,
    orderBy('clapCount', 'desc')
  )

  const chefs = (await getDocs(chefsQuery)).docs.map(dataToJSON)

  return {
    props: { ssrChefs: chefs },
  }
}

type Props = {
  ssrChefs: UserProfile[]
}

const ChefsFeed: NextPage<Props> = ({ ssrChefs }) => {
  const [chefs, setChefs] = React.useState(ssrChefs)
  const { setSortingValue } = useHandleSort<UserProfile>({
    queryValue: 'chefs',
    secondOrderByValue: 'recipeCount',
    setItems: setChefs,
  })

  return (
    <Feed
      labels={['Claps', 'Recipes']}
      title="Chefs"
      itemsLength={chefs.length}
      setSortingValue={setSortingValue}
    >
      <List>
        {chefs.map((user) => (
          <UserItem key={user.uid} user={user} />
        ))}
      </List>
    </Feed>
  )
}

export default ChefsFeed
