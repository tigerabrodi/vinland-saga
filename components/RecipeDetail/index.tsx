import * as React from 'react'
import { Recipe } from '@lib/types'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import defaultAvatar from '../../assets/default-avatar.png'
import PlaceholderImage4x from '../../assets/placeholder-image4x.jpg'
import PlaceholderImage3x from '../../assets/placeholder-image3x.jpg'
import PlaceholderImage2x from '../../assets/placeholder-image2x.jpg'
import ClapSVG from '../../assets/clap.svg'
import BubbleSVG from '../../assets/bubble.svg'
import TrashSVG from '../../assets/trash.svg'
import PenSVG from '../../assets/pen.svg'
import ClockSVG from '../../assets/clock.svg'
import { FieldValue, Timestamp } from '@firebase/firestore'
import {
  AuthorAvatar,
  AuthorLink,
  AuthorText,
  ClapButton,
  CommentLink,
  DateText,
  DeleteButton,
  EditLink,
  RecipeImage,
  Title,
  TopContainer,
  Wrapper,
  MarkDownWrapper,
} from './styles'
import { useUserContext } from '@lib/context'

type Props = {
  recipe: Recipe
  buttons?: React.ReactNode
}

const formatDate = (createdAt: number | Timestamp | FieldValue) =>
  (typeof createdAt === 'number'
    ? new Date(createdAt)
    : (createdAt as Timestamp).toDate()
  )
    .toISOString()
    .split('T')[0]

export const RecipeDetail = ({
  recipe: {
    authorUsername,
    createdAt,
    imageUrl,
    authorFullname,
    authorAvatarUrl,
    body,
    title,
    clapCount,
    commentsCount,
    slug,
  },
  buttons,
}: Props) => {
  const { username } = useUserContext()

  const imageSrcSet =
    imageUrl === ''
      ? `${PlaceholderImage2x.src} 300w, ${PlaceholderImage3x.src} 768w, ${PlaceholderImage4x.src} 1280w`
      : undefined

  const isUserAuthorized = authorUsername === username

  return (
    <Wrapper>
      <TopContainer>
        <Title>{title}</Title>
        <AuthorText>
          by{' '}
          <Link passHref href={`/${authorUsername}`}>
            <AuthorLink>{authorFullname}</AuthorLink>
          </Link>{' '}
          <AuthorAvatar
            src={authorAvatarUrl === '' ? defaultAvatar.src : authorAvatarUrl}
            alt={authorFullname}
          />{' '}
        </AuthorText>
        <RecipeImage
          src={imageUrl === '' ? PlaceholderImage2x.src : imageUrl}
          srcSet={imageSrcSet}
          alt={imageUrl === '' ? 'Placeholder' : title}
        />
        {/* TODO Add Aria Pressed and clap functionality */}
        <ClapButton aria-label={`Recipe ${clapCount} claps`}>
          <ClapSVG />
          {clapCount}
        </ClapButton>
        <Link passHref href="#comments">
          <CommentLink aria-label={`${commentsCount} comments`}>
            <BubbleSVG />
            {commentsCount}
          </CommentLink>
        </Link>
        <DateText>
          {' '}
          <ClockSVG /> Posted on {formatDate(createdAt)}{' '}
        </DateText>
        {isUserAuthorized && (
          <>
            <Link passHref href={`/${authorUsername}/${slug}/edit`}>
              <EditLink aria-label="Edit Recipe">
                <PenSVG />
              </EditLink>
            </Link>
            {/* TODO Add functionality to delete recipe */}
            <DeleteButton aria-label="Delete Recipe">
              <TrashSVG />
            </DeleteButton>
          </>
        )}
      </TopContainer>
      <MarkDownWrapper>
        <ReactMarkdown>{body}</ReactMarkdown>
      </MarkDownWrapper>
      {buttons}
    </Wrapper>
  )
}
