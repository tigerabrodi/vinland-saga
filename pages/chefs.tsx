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
import { ChefProfile } from '@lib/types'
import type { NextPage } from 'next'
import { List } from '../styles/chefsStyles'
import { useHandleSort } from '@hooks/useHandleSort'
import { Metatags } from '@components/Metatags'

export async function getServerSideProps() {
  const chefsQuery = query(
    collection(firebaseDb, 'chefs') as CollectionReference<ChefProfile>,
    orderBy('clapCount', 'desc')
  )

  const chefs = (await getDocs(chefsQuery)).docs.map(dataToJSON)

  return {
    props: { ssrChefs: chefs },
  }
}

type Props = {
  ssrChefs: ChefProfile[]
}

const ChefsFeed: NextPage<Props> = ({ ssrChefs }) => {
  const [chefs, setChefs] = React.useState(ssrChefs)
  const { setSortingValue } = useHandleSort<ChefProfile>({
    queryValue: 'chefs',
    secondOrderByValue: 'recipeCount',
    setItems: setChefs,
  })

  return (
    <>
      <Metatags
        title="Chefs"
        description="Find all the chefs and link to their profile."
      />
      <Feed
        labels={['Claps', 'Recipes']}
        title="Chefs"
        itemsLength={chefs.length}
        setSortingValue={setSortingValue}
      >
        <List>
          {chefs.map((chef) => (
            <UserItem key={chef.uid} chef={chef} />
          ))}
        </List>
      </Feed>
    </>
  )
}

export default ChefsFeed
