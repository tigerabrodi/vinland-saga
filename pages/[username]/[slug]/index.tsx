import * as React from 'react'
import { getDocs, query, doc, getDoc, collection } from '@firebase/firestore'
import { firebaseDb, recipeToJSON, getUserWithUsername } from '@lib/firebase'
import { FullPageSpinner } from '@components/Spinner'
import { Recipe, UserProfile } from '@lib/types'
import type { NextPage } from 'next'
import { useRealtimeState } from '@hooks/useRealtimeState'
import { PageWrapper } from './styles'
import { RecipeDetail } from '@components/RecipeDetail'

type Params = {
  params: {
    username: string
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const { username, slug } = params

  const user = await getUserWithUsername(username)

  let recipe = {} as Recipe
  let path = ''

  if (user) {
    const recipeRef = doc(firebaseDb, `users/${user.uid}/recipes/${slug}`)
    const recipeSnap = await getDoc(recipeRef)

    if (recipeSnap.exists()) {
      recipe = recipeToJSON(recipeSnap)
      path = recipeRef.path
    }
  }

  return {
    props: { recipe, path, user },
    revalidate: 100,
  }
}

export async function getStaticPaths() {
  const recipesQuery = query(collection(firebaseDb, 'recipes'))

  const paths = (await getDocs(recipesQuery)).docs.map((doc) => {
    const { slug, username } = doc.data() as Recipe

    return {
      params: { username, slug },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

type Props = {
  recipe: Recipe
  user: UserProfile
  path: string
}

const RecipeDetailPage: NextPage<Props> = (props) => {
  const realtimeRecipe = useRealtimeState<Recipe>(props.path)

  if (!realtimeRecipe) {
    return <FullPageSpinner />
  }

  const recipe = props.recipe || realtimeRecipe

  return (
    <PageWrapper>
      <RecipeDetail recipe={recipe} user={props.user} />
    </PageWrapper>
  )
}

export default RecipeDetailPage
