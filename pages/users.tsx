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
  const usersQuery = query(
    collection(firebaseDb, 'users') as CollectionReference<UserProfile>,
    orderBy('clapCount', 'desc')
  )

  const users = (await getDocs(usersQuery)).docs.map(dataToJSON)

  return {
    props: { ssrUsers: users },
  }
}

type Props = {
  ssrUsers: UserProfile[]
}

const UsersFeed: NextPage<Props> = ({ ssrUsers }) => {
  const { sortedItems: sortedUsers, setSortingValue } =
    useHandleSort<UserProfile>({
      queryValue: 'users',
      secondOrderByValue: 'recipeCount',
    })

  const users = sortedUsers || ssrUsers

  return (
    <Feed
      labels={['Claps', 'Recipes']}
      title="Users"
      itemsLength={users.length}
      setSortingValue={setSortingValue}
    >
      <List>
        {users.map((user) => (
          <UserItem key={user.uid} user={user} />
        ))}
      </List>
    </Feed>
  )
}

export default UsersFeed
