import { Form, Label, Textarea, PostButton } from './styles'
import PenSVG from '../../assets/pen.svg'
import { useFormState } from '@hooks/useFormState'
import { auth, firebaseDb } from '@lib/firebase'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Comment, Recipe } from '@lib/types'
import { doc, serverTimestamp, setDoc } from '@firebase/firestore'
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
      let createdAt = null
      do {
        createdAt = serverTimestamp()
      } while (createdAt === null)

      const commentData: Comment = {
        text: textarea,
        clapCount: 0,
        authorUsername: username,
        authorAvatarUrl: user.avatarUrl,
        authorFullname: user.fullname,
        createdAt,
        uid: auth.currentUser.uid,
      }

      await setDoc(
        doc(
          firebaseDb,
          `users/${recipe.uid}/recipes/${recipe.slug}/comments/${auth.currentUser.uid}`
        ),
        commentData
      )

      toast.success('You successfully added a comment to this recipe.')
      setStatus('success')
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
