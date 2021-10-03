import * as React from 'react'
import { Recipe, UserProfile } from '@lib/types'
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
import { Timestamp } from '@firebase/firestore'
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

type Props = {
  recipe: Recipe
  user: UserProfile
  buttons?: React.ReactNode
}

export const RecipeDetail = ({ recipe, user, buttons }: Props) => {
  const createdAt = (
    typeof recipe.createdAt === 'number'
      ? new Date(recipe.createdAt)
      : (recipe.createdAt as Timestamp).toDate()
  )
    .toISOString()
    .split('T')[0]

  const imageSrcSet =
    recipe.imageUrl === ''
      ? `${PlaceholderImage2x.src} 300w, ${PlaceholderImage3x.src} 768w, ${PlaceholderImage4x.src} 1280w`
      : undefined

  const isUserAuthorized = recipe.username === user.username

  return (
    <Wrapper>
      <TopContainer>
        <Title>{recipe.title}</Title>
        <AuthorText>
          by{' '}
          <Link passHref href={`/${user.username}`}>
            <AuthorLink>{user.fullname}</AuthorLink>
          </Link>{' '}
          <AuthorAvatar
            src={user.avatarUrl === '' ? defaultAvatar.src : user.avatarUrl}
            alt={user.fullname}
          />{' '}
        </AuthorText>
        <RecipeImage
          src={
            recipe.imageUrl === '' ? PlaceholderImage2x.src : recipe.imageUrl
          }
          srcSet={imageSrcSet}
          alt={recipe.imageUrl === '' ? 'Placeholder' : recipe.title}
        />
        {/* TODO Add Aria Pressed and clap functionality */}
        <ClapButton aria-label={`${recipe.clapCount} claps`}>
          <ClapSVG />
          {recipe.clapCount}
        </ClapButton>
        <Link passHref href="#comments">
          <CommentLink aria-label={`${recipe.commentsCount} comments`}>
            <BubbleSVG />
            {recipe.commentsCount}
          </CommentLink>
        </Link>
        <DateText>
          {' '}
          <ClockSVG /> Posted on {createdAt}{' '}
        </DateText>
        {isUserAuthorized && (
          <>
            <Link passHref href={`/${user.username}/${recipe.slug}/edit`}>
              <EditLink aria-label="Edit">
                <PenSVG />
              </EditLink>
            </Link>
            {/* TODO Add functionality to delete recipe */}
            <DeleteButton aria-label="Delete">
              <TrashSVG />
            </DeleteButton>
          </>
        )}
      </TopContainer>
      <MarkDownWrapper>
        <ReactMarkdown>{recipe.body}</ReactMarkdown>
      </MarkDownWrapper>
      {buttons}
    </Wrapper>
  )
}
