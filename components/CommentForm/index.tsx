import { Form, Label, Textarea, PostButton } from './styles'
import { useFormState } from '@hooks/useFormState'
import { v4 as uuidv4 } from 'uuid'
import { auth, firebaseDb } from '@lib/firebase/firebase'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Comment, Recipe } from '@lib/types'
import {
  doc,
  increment,
  serverTimestamp,
  writeBatch,
} from '@firebase/firestore'
import { useUserContext } from '@lib/context'
import { useGetChef } from '@hooks/auth/useGetChef'
import { useLoadingStore } from '@lib/store'
import { PenIcon } from '@icons/Pen'

type Props = {
  recipe: Recipe
}

export const CommentForm = ({ recipe }: Props) => {
  const { push } = useRouter()
  const { setStatus } = useLoadingStore()
  const { username } = useUserContext()
  const { chef } = useGetChef(username)
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

    if (chef && username) {
      const commentData: Comment = {
        text: textarea,
        clapCount: 0,
        authorUsername: username,
        authorAvatarUrl: chef.avatarUrl,
        authorFullname: chef.fullname,
        createdAt: serverTimestamp(),
        uid: auth.currentUser.uid,
        id: uuidv4(),
      }

      const batch = writeBatch(firebaseDb)

      batch.set(
        doc(
          firebaseDb,
          `chefs/${recipe.uid}/recipes/${recipe.slug}/comments/${commentData.id}`
        ),
        commentData
      )

      batch.update(
        doc(firebaseDb, `chefs/${recipe.uid}/recipes/${recipe.slug}`),
        { commentsCount: increment(1) }
      )

      await batch.commit()

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
        <PenIcon /> Post
      </PostButton>
    </Form>
  )
}
