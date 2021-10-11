import * as React from 'react'
import { getDocs, query, doc, getDoc, collection } from '@firebase/firestore'
import { firebaseDb, recipeToJSON, getUserWithUsername } from '@lib/firebase'
import { FullPageSpinner } from '@components/Spinner'
import { Recipe } from '@lib/types'
import type { NextPage } from 'next'
import { useRealtimeState } from '@hooks/useRealtimeState'
import { CommentsHeading, NoCommentsText, PageWrapper } from './styles'
import { RecipeDetail } from '@components/RecipeDetail'
import { CommentForm } from '@components/CommentForm'

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
    props: { recipe, path },
    revalidate: 30,
  }
}

export async function getStaticPaths() {
  const recipesQuery = query(collection(firebaseDb, 'recipes'))

  const paths = (await getDocs(recipesQuery)).docs.map((doc) => {
    const { slug, authorUsername } = doc.data() as Recipe

    return {
      params: { slug, authorUsername },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

type Props = {
  recipe: Recipe
  path: string
}

const RecipeDetailPage: NextPage<Props> = (props) => {
  const realtimeRecipe = useRealtimeState(props.path)?.data() as Recipe

  const recipe = realtimeRecipe || props.recipe

  if (!realtimeRecipe && !props.recipe) {
    return <FullPageSpinner />
  }

  return (
    <PageWrapper>
      <RecipeDetail recipe={recipe} />
      <CommentForm />
      <CommentsHeading id="comments">Comments</CommentsHeading>
      <NoCommentsText>This recipe currently has no comments.</NoCommentsText>
    </PageWrapper>
  )
}

export default RecipeDetailPage
