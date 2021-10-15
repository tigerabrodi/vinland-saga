import * as React from 'react'
import Link from 'next/link'
import PenSVG from '../../assets/pen.svg'
import CloseSVG from '../../assets/close.svg'
import TrashSVG from '../../assets/trash.svg'
import defaultAvatar from '../../assets/default-avatar.png'
import Dot from '../../assets/dot.svg'
import {
  AuthorAvatar,
  AuthorLink,
  AuthorText,
  CommentClapButton,
  CommentListItem,
  DeleteButton,
  EditButton,
  Form,
  Line,
  Text,
  HiddenLabel,
  Textarea,
  SaveButton,
} from './styles'
import { useFormState } from '@hooks/useFormState'
import { useFocusTrap } from '@hooks/useFocusTrap'
import { useClickOutside } from '@hooks/useClickOutside'
import { useCloseEscape } from '@hooks/useCloseEscape'
import { Comment, Recipe } from '@lib/types'
import { auth, firebaseDb, formatDate } from '@lib/firebase'
import { doc, setDoc } from '@firebase/firestore'
import { useLoadingStore } from '@lib/store'
import toast from 'react-hot-toast'

type Props = {
  comment: Comment
  recipe: Recipe
}

export const CommentItem = ({
  comment: {
    authorAvatarUrl,
    authorFullname,
    authorUsername,
    text,
    uid,
    createdAt,
  },
  recipe,
}: Props) => {
  const [isEditMode, setIsEditMode] = React.useState(false)
  const {
    formState: { editTextarea },
    handleChange,
  } = useFormState({ editTextarea: text })
  const { setStatus } = useLoadingStore()

  const editRef = useFocusTrap<HTMLFormElement>(isEditMode)

  useClickOutside({
    ref: editRef,
    callback: () => setIsEditMode(false),
    shouldTriggerCallback: isEditMode,
  })

  useCloseEscape(() => setIsEditMode(false))

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!auth.currentUser) return

    setStatus('loading')

    const commentData = {
      text: editTextarea,
    }

    await setDoc(
      doc(
        firebaseDb,
        `users/${recipe.uid}/recipes/${recipe.slug}/comments/${uid}`
      ),
      commentData,
      { merge: true }
    )

    toast.success('Successfully edited your comment.')
    setStatus('success')
  }

  const isUserAuthorized = uid === auth.currentUser?.uid

  const handleClap = () => {}

  return (
    <CommentListItem>
      <AuthorAvatar
        src={authorAvatarUrl === '' ? defaultAvatar.src : authorAvatarUrl}
        alt={authorFullname}
      />
      <AuthorText>
        <Dot />
        By{' '}
        <Link passHref href={`/${authorUsername}`}>
          <AuthorLink>{authorFullname}</AuthorLink>
        </Link>
        <Dot />
        On {formatDate(createdAt)}
        <Dot />
      </AuthorText>
      {isEditMode ? (
        <Form onSubmit={handleEditSubmit} ref={editRef}>
          <HiddenLabel htmlFor="edit">Edit Comment</HiddenLabel>
          <Textarea
            placeholder="I liked this recipe of yours, because..."
            id="edit"
            value={editTextarea}
            name="editTextarea"
            onChange={handleChange}
          />
          <SaveButton type="submit">
            <PenSVG />
            Save
          </SaveButton>
        </Form>
      ) : (
        <Text>{text}</Text>
      )}
      <CommentClapButton
        isDark={true}
        label="Comment"
        handleClap={handleClap}
        isDocExist={false}
        clapCount={0}
      />
      {isUserAuthorized && (
        <>
          <EditButton
            aria-label="Edit Comment"
            onClick={() => setIsEditMode(!isEditMode)}
            aria-pressed={isEditMode}
          >
            {isEditMode ? <CloseSVG /> : <PenSVG />}
          </EditButton>
          <DeleteButton aria-label="Delete Comment">
            <TrashSVG />
          </DeleteButton>
        </>
      )}
      <Line />
    </CommentListItem>
  )
}
