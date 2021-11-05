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
import { useLoadingStore } from '@lib/store'

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
  const [sortedUsers, setSortedUsers] = React.useState<UserProfile[] | null>(
    null
  )
  const [sortingValue, setSortingValue] = React.useState('')
  const { setStatus } = useLoadingStore()

  const users = sortedUsers || ssrUsers

  React.useEffect(() => {
    if (sortingValue === '') {
      return
    }

    const setUsers = async () => {
      setStatus('loading')
      const usersQuery = query<UserProfile>(
        collection(firebaseDb, 'users') as CollectionReference<UserProfile>,
        sortingValue === 'Claps'
          ? orderBy('clapCount', 'desc')
          : orderBy('recipeCount', 'desc')
      )

      const users = (await getDocs<UserProfile>(usersQuery)).docs.map(
        dataToJSON
      )

      setSortedUsers(users)
      setStatus('success')
    }

    setUsers()
  }, [setStatus, sortingValue])

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
