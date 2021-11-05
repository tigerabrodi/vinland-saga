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
import { useLoadingStore } from '@lib/store'

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
  const [sortedRecipes, setSortedRecipes] = React.useState<Recipe[] | null>(
    null
  )
  const [sortingValue, setSortingValue] = React.useState('')
  const { setStatus } = useLoadingStore()

  React.useEffect(() => {
    if (sortingValue === '') {
      return
    }

    const setRecipes = async () => {
      setStatus('loading')
      const recipesQuery = query<Recipe>(
        collectionGroup(firebaseDb, 'recipes') as CollectionReference<Recipe>,
        sortingValue === 'Claps'
          ? orderBy('clapCount', 'desc')
          : orderBy('createdAt', 'desc')
      )

      const recipes = (await getDocs<Recipe>(recipesQuery)).docs.map(dataToJSON)

      setSortedRecipes(recipes)
      setStatus('success')
    }

    setRecipes()
  }, [sortingValue, setStatus])

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
