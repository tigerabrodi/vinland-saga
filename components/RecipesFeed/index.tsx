import { RecipeItem } from '@components/RecipeItem'
import { Recipe } from '@lib/types'
import { RecipesList } from './styles'

type Props = {
  recipes: Recipe[]
}

export const RecipesFeed = ({ recipes }: Props) => (
  <RecipesList>
    {recipes.map((recipe) => (
      <RecipeItem key={recipe.slug} recipe={recipe} />
    ))}
  </RecipesList>
)
