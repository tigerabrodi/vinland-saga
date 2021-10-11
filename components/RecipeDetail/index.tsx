import * as React from 'react'
import { Recipe } from '@lib/types'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import defaultAvatar from '../../assets/default-avatar.png'
import PlaceholderImage4x from '../../assets/placeholder-image4x.jpg'
import PlaceholderImage3x from '../../assets/placeholder-image3x.jpg'
import PlaceholderImage2x from '../../assets/placeholder-image2x.jpg'
import ClapSVG from '../../assets/clap.svg'
import ClapFilledSVG from '../../assets/clap-filled.svg'
import BubbleSVG from '../../assets/bubble.svg'
import TrashSVG from '../../assets/trash.svg'
import PenSVG from '../../assets/pen.svg'
import ClockSVG from '../../assets/clock.svg'
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
import {
  auth,
  firebaseDb,
  formatDate,
  removeClap,
  addClap,
} from '@lib/firebase'
import { doc } from '@firebase/firestore'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useRealtimeState } from '@hooks/useRealtimeState'

type Props = {
  recipe: Recipe
  buttons?: React.ReactNode
}

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
    uid,
  },
  buttons,
}: Props) => {
  const { username, user } = useUserContext()
  const { push } = useRouter()

  const imageSrcSet =
    imageUrl === ''
      ? `${PlaceholderImage2x.src} 300w, ${PlaceholderImage3x.src} 768w, ${PlaceholderImage4x.src} 1280w`
      : undefined

  const isUserAuthorized = authorUsername === username

  const postPath = `users/${uid}/recipes/${slug}`
  const postRef = doc(firebaseDb, postPath)

  const clapRef = doc(firebaseDb, `${postPath}/claps/${auth.currentUser?.uid}`)

  const isClapDocExist = !!useRealtimeState(clapRef.path)?.exists()

  const handleClap = () => {
    if (!user) {
      toast.error('You have to be authorized to clap a recipe.')
      return push('/sign-in')
    }

    return isClapDocExist
      ? removeClap(postRef, clapRef)
      : addClap(postRef, clapRef)
  }

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
        <ClapButton
          aria-label={`Recipe ${clapCount} claps`}
          aria-pressed={isClapDocExist}
          onClick={() => handleClap()}
        >
          {isClapDocExist ? <ClapFilledSVG /> : <ClapSVG />}
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
