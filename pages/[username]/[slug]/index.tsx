import * as React from 'react'
import {
  getDocs,
  query,
  doc,
  getDoc,
  collection,
  onSnapshot,
} from '@firebase/firestore'
import { firebaseDb } from '@lib/firebase/firebase'
import { FullPageSpinner } from '@components/Spinner'
import { Comment, Recipe } from '@lib/types'
import type { NextPage } from 'next'
import { useRealtimeState } from '@hooks/useRealtimeState'
import {
  CommentsHeading,
  CommentsList,
  NoCommentsText,
  PageWrapper,
} from './styles'
import { RecipeDetail } from '@components/RecipeDetail'
import { CommentForm } from '@components/CommentForm'
import { CommentItem } from '@components/CommentItem'
import { useLoadingStore } from '@lib/store'
import { commentsToJSON, dataToJSON } from '@lib/firebase/format-utils'
import { getUserWithUsername } from '@lib/firebase/get-utils'

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
  let recipePath = ''
  let comments = [] as Comment[]

  if (user) {
    recipePath = `users/${user.uid}/recipes/${slug}`
    const recipeRef = doc(firebaseDb, recipePath)
    const recipeSnapshot = await getDoc(recipeRef)

    const commentsSnapshot = await getDocs(
      collection(firebaseDb, `${recipePath}/comments`)
    )

    if (!commentsSnapshot.empty) {
      comments = commentsToJSON(commentsSnapshot)
    }

    if (recipeSnapshot.exists()) {
      recipe = dataToJSON(recipeSnapshot)
    }
  }

  return {
    props: { recipe, recipePath, comments },
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
  recipePath: string
  comments: Comment[]
}

const RecipeDetailPage: NextPage<Props> = (props) => {
  const { setStatus } = useLoadingStore()
  const [realtimeComments, setRealtimeComments] = React.useState<Comment[]>([])

  const realtimeRecipe = useRealtimeState(props.recipePath)?.data() as Recipe
  const recipe = realtimeRecipe || props.recipe

  const comments = realtimeComments || props.comments

  React.useEffect(() => {
    setStatus('loading')
    const unsubscribe = onSnapshot(
      query(collection(firebaseDb, `${props.recipePath}/comments`)),
      (commentsSnapshot) => {
        setRealtimeComments(commentsToJSON(commentsSnapshot))
        setStatus('success')
      }
    )
    return unsubscribe
  }, [props.recipePath, setStatus])

  if (!realtimeRecipe && !props.recipe) {
    return <FullPageSpinner />
  }

  return (
    <PageWrapper>
      <RecipeDetail recipe={recipe} />
      <CommentForm recipe={recipe} />
      <section>
        <CommentsHeading id="comments">Comments</CommentsHeading>
        {comments.length ? (
          <CommentsList>
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} recipe={recipe} />
            ))}
          </CommentsList>
        ) : (
          <NoCommentsText>
            This recipe currently has no comments.
          </NoCommentsText>
        )}
      </section>
    </PageWrapper>
  )
}

export default RecipeDetailPage
