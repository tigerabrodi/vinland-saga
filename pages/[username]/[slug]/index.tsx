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
    const recipeSnap = await getDoc(recipeRef)

    const commentsSnapshot = await getDocs(
      collection(firebaseDb, `${recipePath}/comments`)
    )

    commentsSnapshot.forEach((doc) => {
      comments = [...comments, doc.data() as Comment]
    })

    if (recipeSnap.exists()) {
      recipe = recipeToJSON(recipeSnap)
    }
  }

  return {
    props: { recipe, recipePath },
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
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setRealtimeComments([...realtimeComments, doc.data() as Comment])
        })
        setStatus('success')
      }
    )
    return unsubscribe
  }, [props.recipePath, realtimeComments, setStatus])

  if (!realtimeRecipe && !props.recipe) {
    return <FullPageSpinner />
  }

  return (
    <PageWrapper>
      <RecipeDetail recipe={recipe} />
      <CommentForm recipe={recipe} />
      <CommentsHeading id="comments">Comments</CommentsHeading>
      {comments.length ? (
        <CommentsList>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} recipe={recipe} />
          ))}
        </CommentsList>
      ) : (
        <NoCommentsText>This recipe currently has no comments.</NoCommentsText>
      )}
    </PageWrapper>
  )
}

export default RecipeDetailPage
