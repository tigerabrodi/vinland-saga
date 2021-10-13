import * as React from 'react'
import Link from 'next/link'
import PenSVG from '../../assets/pen.svg'
import CloseSVG from '../../assets/close.svg'
import TrashSVG from '../../assets/trash.svg'
import DummyAvatar from '../../cypress/fixtures/tiger-avatar.png'
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

export const CommentItem = () => {
  const [isEditMode, setIsEditMode] = React.useState(false)

  // TODO make sure edit form is accessible

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handleClap = () => {}
  return (
    <CommentListItem>
      <AuthorAvatar src={DummyAvatar.src} />
      <AuthorText>
        <Dot />
        By{' '}
        <Link passHref href={`/`}>
          <AuthorLink>Tiger Abrodi</AuthorLink>
        </Link>
        <Dot />
        On 2021-09-21
        <Dot />
      </AuthorText>
      {isEditMode ? (
        <Form onSubmit={handleEditSubmit}>
          <HiddenLabel htmlFor="edit">Edit Comment</HiddenLabel>
          <Textarea
            placeholder="I liked this recipe of yours, because..."
            id="edit"
            value="Did you ever try to bootstrap another project after this one started to
        stall?"
          />
          <SaveButton type="submit">
            <PenSVG />
            Save
          </SaveButton>
        </Form>
      ) : (
        <Text>
          Did you ever try to bootstrap another project after this one started
          to stall?
        </Text>
      )}
      <CommentClapButton
        isDark={true}
        label="Comment"
        handleClap={handleClap}
        isDocExist={false}
        clapCount={0}
      />
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
      <Line />
    </CommentListItem>
  )
}
