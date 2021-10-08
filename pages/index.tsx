import { RecipeItem } from '@components/RecipeItem'
import { collection, getDocs, limit, query } from '@firebase/firestore'
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

// Max recipes to query per page
const LIMIT = 10

export async function getServerSideProps() {
  const recipesQuery = query(collection(firebaseDb, 'recipes'), limit(LIMIT))

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
      {recipes.length > 0 ? (
        <RecipesList>
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
