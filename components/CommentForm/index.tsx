import { Form, Label, Textarea, PostButton } from './styles'
import PenSVG from '../../assets/pen.svg'
import { useFormState } from '@hooks/useFormState'
import { v4 as uuidv4 } from 'uuid'
import { auth, firebaseDb } from '@lib/firebase'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Comment, Recipe } from '@lib/types'
import { doc, increment, serverTimestamp, setDoc } from '@firebase/firestore'
import { useUserContext } from '@lib/context'
import { useGetUser } from '@hooks/auth/useGetUser'
import { useLoadingStore } from '@lib/store'

type Props = {
  recipe: Recipe
}

export const CommentForm = ({ recipe }: Props) => {
  const { push } = useRouter()
  const { setStatus } = useLoadingStore()
  const { username } = useUserContext()
  const { user } = useGetUser(username)
  const {
    formState: { textarea },
    setFormState,
    handleChange,
  } = useFormState({ textarea: '' })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')

    if (!auth.currentUser) {
      toast.error('You must be authenticated to comment on a recipe.')
      setStatus('error')
      return push('/sign-in')
    }

    if (user && username) {
      const commentData: Comment = {
        text: textarea,
        clapCount: 0,
        authorUsername: username,
        authorAvatarUrl: user.avatarUrl,
        authorFullname: user.fullname,
        createdAt: serverTimestamp(),
        uid: auth.currentUser.uid,
        id: uuidv4(),
      }

      await setDoc(
        doc(
          firebaseDb,
          `users/${recipe.uid}/recipes/${recipe.slug}/comments/${commentData.id}`
        ),
        commentData
      )

      await setDoc(
        doc(firebaseDb, `users/${recipe.uid}/recipes/${recipe.slug}`),
        { commentsCount: increment(1) }
      )

      toast.success('You successfully added a comment to this recipe.')
      setStatus('success')
      setFormState({ textarea: '' })
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="textarea">Comment</Label>
      <Textarea
        id="textarea"
        name="textarea"
        onChange={handleChange}
        value={textarea}
        placeholder="I liked this recipe of yours, because..."
      />
      <PostButton type="submit" disabled={!textarea.length}>
        <PenSVG /> Post
      </PostButton>
    </Form>
  )
}
