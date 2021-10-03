import * as React from 'react'
import {
  getDocs,
  query,
  doc,
  getDoc,
  collection,
  onSnapshot,
} from '@firebase/firestore'
import { firebaseDb, recipeToJSON, getUserWithUsername } from '@lib/firebase'
import { FullPageSpinner } from '@components/Spinner'
import { Recipe, UserProfile } from '@lib/types'
import type { NextPage } from 'next'
import { useLoadingStore } from '@lib/store'

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

const RecipeDetail: NextPage<Props> = (props) => {
  const [realtimeRecipe, setRealtimeRecipe] = React.useState<null | Recipe>(
    null
  )

  const { setStatus } = useLoadingStore()

  React.useEffect(() => {
    setStatus('loading')
    const unsubscribe = onSnapshot(doc(firebaseDb, props.path), (doc) => {
      if (doc.exists()) {
        setRealtimeRecipe(doc.data() as Recipe)
        setStatus('success')
      }
    })

    return unsubscribe
  }, [props.path, setStatus])

  if (!realtimeRecipe) {
    return <FullPageSpinner />
  }

  const recipe = props.recipe || realtimeRecipe

  return <div>{recipe.title}</div>
}

export default RecipeDetail
