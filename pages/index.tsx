import * as React from 'react'
import { Feed } from '@components/Feed'
import { RecipesFeed } from '@components/RecipesFeed'
import {
  collectionGroup,
  CollectionReference,
  getDocs,
  limit,
  orderBy,
  query,
} from '@firebase/firestore'
import { firebaseDb } from '@lib/firebase/firebase'
import { dataToJSON } from '@lib/firebase/format-utils'
import { Recipe } from '@lib/types'
import type { NextPage } from 'next'
import { useHandleSort } from '@hooks/useHandleSort'
import styled from 'styled-components'
import { theme } from '@styles/theme'
import { media } from '@styles/media'

const MAX_RECIPES_PER_PAGE = 10

export async function getServerSideProps() {
  const recipesQuery = query<Recipe>(
    collectionGroup(firebaseDb, 'recipes') as CollectionReference<Recipe>,
    orderBy('clapCount', 'desc'),
    limit(MAX_RECIPES_PER_PAGE)
  )

  const recipes = (await getDocs<Recipe>(recipesQuery)).docs.map(dataToJSON)

  return {
    props: { ssrRecipes: recipes },
  }
}

const LoadMoreButton = styled.button`
  text-align: center;
  background-color: ${theme.Pink};
  border-radius: 0.2rem;
  color: ${theme.Brown};
  box-shadow: 0 0.2rem 0.2rem black;
  height: 3.5rem;
  width: 10rem;
  font-weight: 600;
  margin-top: 3rem;
  ${media.tablet} {
    margin-top: 5rem;
    font-size: 2rem;
    width: 15rem;
    height: 5rem;
    transition: all 0.2s ease;
    &:hover {
      box-shadow: 0 0.3rem 0.3rem black;
      transform: translateY(-0.2rem);
    }
    &:active {
      box-shadow: 0 0.1rem 0.2rem black;
      transform: translateY(0);
    }
  }
  ${media.desktop} {
    margin-top: 7rem;
    height: 6rem;
    font-size: 2.3rem;
    width: 17rem;
    margin-bottom: 2rem;
  }
`

type Props = {
  ssrRecipes: Recipe[]
}

const RecipesFeedHome: NextPage<Props> = ({ ssrRecipes }) => {
  const [recipes, setRecipes] = React.useState(ssrRecipes)

  const { setSortingValue } = useHandleSort<Recipe>({
    queryValue: 'recipes',
    secondOrderByValue: 'createdAt',
    setItems: setRecipes,
  })

  // const {setStatus} = useLoadingStore()

  // const [recipesEnd, setRecipesEnd] = React.useState(false)

  /*     const getMoreRecipes = async () => {
      setStatus("loading")
      const last = posts[posts.length - 1]

      const cursor =
        typeof last.createdAt === 'number'
          ? fromMillis(last.createdAt)
          : last.createdAt

      const query = firestore
        .collectionGroup('posts')
        .where('published', '==', true)
        .orderBy('createdAt', 'desc')
        .startAfter(cursor)
        .limit(MAX_RECIPES_PER_PAGE)

      const newPosts = (await query.get()).docs.map((doc) => doc.data())

      setPosts(posts.concat(newPosts))
      setStatus("success")

      if (newPosts.length < LIMIT) {
        setPostsEnd(true)
      }
    } */

  return (
    <Feed
      labels={['Claps', 'Newest']}
      title="Recipes"
      itemsLength={recipes.length}
      setSortingValue={setSortingValue}
    >
      <RecipesFeed recipes={recipes} />
      <LoadMoreButton>Load More</LoadMoreButton>
    </Feed>
  )
}

export default RecipesFeedHome
