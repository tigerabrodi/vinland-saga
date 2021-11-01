import { Feed } from '@components/Feed'
import { RecipesFeed } from '@components/RecipesFeed'
import {
  collectionGroup,
  CollectionReference,
  getDocs,
  query,
} from '@firebase/firestore'
import { firebaseDb } from '@lib/firebase/firebase'
import { dataToJSON } from '@lib/firebase/format-utils'
import { Recipe } from '@lib/types'
import type { NextPage } from 'next'

// TODO use this to limit the the queries and add a load more button.
// const MAX_RECIPES_PER_PAGE = 10

export async function getServerSideProps() {
  const recipesQuery = query<Recipe>(
    collectionGroup(firebaseDb, 'recipes') as CollectionReference<Recipe>
  )

  const recipes = (await getDocs<Recipe>(recipesQuery)).docs.map(dataToJSON)

  return {
    props: { recipes },
  }
}

type Props = {
  recipes: Recipe[]
}

const RecipesFeedHome: NextPage<Props> = ({ recipes }) => {
  return (
    <Feed
      labels={['Claps', 'Newest']}
      title="Recipes"
      itemsLength={recipes.length}
    >
      <RecipesFeed recipes={recipes} />
    </Feed>
  )
}

export default RecipesFeedHome
