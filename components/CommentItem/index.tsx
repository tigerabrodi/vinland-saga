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
import { auth, firebaseDb } from '@lib/firebase/firebase'
import { doc, increment, setDoc, writeBatch } from '@firebase/firestore'
import { useLoadingStore } from '@lib/store'
import toast from 'react-hot-toast'
import { ConfirmationModal } from '@components/ConfirmationModal'
import { formatDate } from '@lib/firebase/format-utils'
import { useRealtimeState } from '@hooks/useRealtimeState'

type Props = {
  comment: Comment
  recipe: Recipe
}

export const CommentItem = ({ comment, recipe }: Props) => {
  const [isEditMode, setIsEditMode] = React.useState(false)
  const {
    formState: { editTextarea },
    handleChange,
  } = useFormState({ editTextarea: comment.text })
  const { setStatus } = useLoadingStore()

  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const {
    authorAvatarUrl,
    authorFullname,
    authorUsername,
    text,
    uid,
    createdAt,
    id,
    clapCount,
  } = comment

  const editRef = useFocusTrap<HTMLFormElement>(isEditMode)

  useClickOutside({
    ref: editRef,
    callback: () => setIsEditMode(false),
    shouldTriggerCallback: isEditMode,
  })

  useCloseEscape(() => setIsEditMode(false))

  const clapRef = doc(
    firebaseDb,
    `users/${recipe.uid}/recipes/${recipe.slug}/comments/${id}/claps/${auth.currentUser?.uid}`
  )

  const hasUserClappedComment = Boolean(
    useRealtimeState(clapRef.path)?.exists()
  )

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setStatus('loading')

    const commentData: Comment = {
      ...comment,
      text: editTextarea,
    }

    await setDoc(
      doc(
        firebaseDb,
        `users/${recipe.uid}/recipes/${recipe.slug}/comments/${id}`
      ),
      commentData
    )

    toast.success('Successfully edited your comment.')
    setIsEditMode(false)
    setStatus('success')
  }

  const handleDelete = async () => {
    setStatus('loading')

    const batch = writeBatch(firebaseDb)

    batch.delete(
      doc(
        firebaseDb,
        `users/${recipe.uid}/recipes/${recipe.slug}/comments/${id}`
      )
    )

    batch.update(
      doc(firebaseDb, `users/${recipe.uid}/recipes/${recipe.slug}`),
      { commentsCount: increment(-1) }
    )

    await batch.commit()

    toast.success('Successfully deleted your comment.')
    setIsModalOpen(false)
    setStatus('success')
  }

  const isUserAuthorized = uid === auth.currentUser?.uid

  const handleClap = () => {}

  return (
    <>
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
          <span>On {formatDate(createdAt)}</span>
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
          hasUserClap={hasUserClappedComment}
          clapCount={clapCount}
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
            <DeleteButton
              aria-label="Delete Comment"
              onClick={() => setIsModalOpen(true)}
            >
              <TrashSVG />
            </DeleteButton>
          </>
        )}
        <Line />
      </CommentListItem>
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          onSuccess={handleDelete}
          text="Do you really want to delete your comment?"
        />
      )}
    </>
  )
}
