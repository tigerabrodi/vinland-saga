import * as React from 'react'
import { Feed } from '@components/Feed'
import { RecipesFeed } from '@components/RecipesFeed'
import {
  collectionGroup,
  CollectionReference,
  getDocs,
  orderBy,
  query,
} from '@firebase/firestore'
import { firebaseDb } from '@lib/firebase/firebase'
import { dataToJSON } from '@lib/firebase/format-utils'
import { Recipe } from '@lib/types'
import type { NextPage } from 'next'
import { useHandleSort } from '@hooks/useHandleSort'

// TODO use this to limit the the queries and add a load more button.
// const MAX_RECIPES_PER_PAGE = 10

export async function getServerSideProps() {
  const recipesQuery = query<Recipe>(
    collectionGroup(firebaseDb, 'recipes') as CollectionReference<Recipe>,
    orderBy('clapCount', 'desc')
  )

  const recipes = (await getDocs<Recipe>(recipesQuery)).docs.map(dataToJSON)

  return {
    props: { ssrRecipes: recipes },
  }
}

type Props = {
  ssrRecipes: Recipe[]
}

const RecipesFeedHome: NextPage<Props> = ({ ssrRecipes }) => {
  const { sortedItems: sortedRecipes, setSortingValue } = useHandleSort<Recipe>(
    { queryValue: 'recipes', secondOrderByValue: 'createdAt' }
  )

  const recipes = sortedRecipes || ssrRecipes

  return (
    <Feed
      labels={['Claps', 'Newest']}
      title="Recipes"
      itemsLength={recipes.length}
      setSortingValue={setSortingValue}
    >
      <RecipesFeed recipes={recipes} />
    </Feed>
  )
}

export default RecipesFeedHome
