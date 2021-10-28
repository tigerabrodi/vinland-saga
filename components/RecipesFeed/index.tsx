import { RecipeItem } from '@components/RecipeItem'
import { Recipe } from '@lib/types'
import { List } from './styles'

type Props = {
  recipes: Recipe[]
  isWithinSecondSection?: boolean
}

export const RecipesFeed = ({
  recipes,
  isWithinSecondSection = false,
}: Props) => (
  <List>
    {recipes.map((recipe) => (
      <RecipeItem
        key={recipe.slug}
        recipe={recipe}
        isWithinSecondSection={isWithinSecondSection}
      />
    ))}
  </List>
)
