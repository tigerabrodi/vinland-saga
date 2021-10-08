import { RecipeItem } from '@components/RecipeItem'
import { Recipe } from '@lib/types'
import type { NextPage } from 'next'
import {
  FeedSection,
  TopWrapper,
  Title,
  ToolBar,
  ToolBarButton,
  RecipesList,
} from './styles'

export async function getServerSideProps() {}

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
      <RecipesList>
        {recipes.map((recipe) => (
          <RecipeItem key={recipe.slug} recipe={recipe} />
        ))}
      </RecipesList>
    </FeedSection>
  )
}

export default RecipesFeed
