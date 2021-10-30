import { Feed } from '@components/Feed'
import { UserItem } from '@components/UserItem'
import { collection, getDocs, query } from '@firebase/firestore'
import { firebaseDb } from '@lib/firebase/firebase'
import { dataToJSON } from '@lib/firebase/format-utils'
import { UserProfile } from '@lib/types'
import type { NextPage } from 'next'
import { List } from './usersStyles'

export async function getServerSideProps() {
  const usersQuery = query(collection(firebaseDb, 'users'))

  const users = (await getDocs(usersQuery)).docs.map(
    dataToJSON
  ) as UserProfile[]

  return {
    props: { users },
  }
}

type Props = {
  users: UserProfile[]
}

const UsersFeed: NextPage<Props> = ({ users }) => {
  return (
    <Feed
      labels={['Hearts', 'Recipes']}
      title="Users"
      itemsLength={users.length}
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
