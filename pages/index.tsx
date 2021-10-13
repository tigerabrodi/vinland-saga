import { RecipeItem } from '@components/RecipeItem'
import { collectionGroup, getDocs, query } from '@firebase/firestore'
import { firebaseDb, recipeToJSON } from '@lib/firebase'
import { Recipe } from '@lib/types'
import type { NextPage } from 'next'
import {
  FeedSection,
  TopWrapper,
  Title,
  ToolBar,
  ToolBarButton,
  RecipesList,
  NoFoundText,
} from './styles'

// TODO use this to limit the the queries and add a load more button.
// const MAX_RECIPES_PER_PAGE = 10

export async function getServerSideProps() {
  const recipesQuery = query(collectionGroup(firebaseDb, 'recipes'))

  const recipes = (await getDocs(recipesQuery)).docs.map(
    recipeToJSON
  ) as Recipe[]

  return {
    props: { recipes },
  }
}

type Props = {
  recipes: Recipe[]
}

const RecipesFeed: NextPage<Props> = ({ recipes }) => {
  return (
    <FeedSection>
      <TopWrapper>
        <Title>Recipes</Title>
        <ToolBar role="toolbar" aria-label="Sort by claps or newest date">
          <ToolBarButton>Claps</ToolBarButton>
          <ToolBarButton>Newest</ToolBarButton>
        </ToolBar>
      </TopWrapper>
      {recipes.length ? (
        <RecipesList recipesLength={recipes.length}>
          {recipes.map((recipe) => (
            <RecipeItem key={recipe.slug} recipe={recipe} />
          ))}
        </RecipesList>
      ) : (
        <NoFoundText>Currently no recipes exist.</NoFoundText>
      )}
    </FeedSection>
  )
}

export default RecipesFeed
