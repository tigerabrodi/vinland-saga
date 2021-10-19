import { RecipeItem } from '@components/RecipeItem'
import { Recipe } from '@lib/types'
import { RecipesList } from './styles'

type Props = {
  recipes: Recipe[]
  isWithinSecondSection?: boolean
}

export const RecipesFeed = ({
  recipes,
  isWithinSecondSection = false,
}: Props) => (
  <RecipesList>
    {recipes.map((recipe) => (
      <RecipeItem
        key={recipe.slug}
        recipe={recipe}
        isWithinSecondSection={isWithinSecondSection}
      />
    ))}
  </RecipesList>
)
