import * as React from 'react'
import { Recipe } from '@lib/types'
import ClapSVG from '../../assets/clap.svg'
import ClapFilledSVG from '../../assets/clap-filled.svg'
import BubbleSVG from '../../assets/bubble.svg'
import Link from 'next/link'
import {
  ListItem,
  Image,
  Avatar,
  AuthorLink,
  Date,
  Title,
  ClapText,
  CommentText,
  ReadingTime,
  TitleLink,
} from './styles'
import { auth, firebaseDb } from '@lib/firebase/firebase'
import { doc, getDoc } from '@firebase/firestore'
import { formatDate } from '@lib/firebase/format-utils'
import {
  defaultAvatar,
  placeholderImage2x,
  placeholderImage3x,
  placeholderImage4x,
} from '@styles/theme'

type Props = {
  recipe: Recipe
  isWithinSecondSection?: boolean
}

export const RecipeItem = ({
  recipe: {
    authorUsername,
    createdAt,
    imageUrl,
    authorFullname,
    authorAvatarUrl,
    title,
    clapCount,
    commentsCount,
    slug,
    readingTime,
    uid,
  },
  isWithinSecondSection,
}: Props) => {
  const [clapSnapshotExists, setClapSnapshotExists] = React.useState(false)

  const imageSrcSet =
    imageUrl === ''
      ? `${placeholderImage2x} 300w, ${placeholderImage3x} 768w, ${placeholderImage4x} 1280w`
      : undefined

  const formattedDate = formatDate(createdAt)

  React.useEffect(() => {
    const checkClapExists = async () => {
      const clapRef = doc(
        firebaseDb,
        `chefs/${uid}/recipes/${slug}/claps/${auth.currentUser?.uid}`
      )

      const clapSnap = await getDoc(clapRef)

      setClapSnapshotExists(Boolean(clapSnap.exists()))
    }

    checkClapExists()
  }, [slug, uid])

  return (
    <ListItem aria-label={title}>
      <Image
        src={imageUrl === '' ? placeholderImage2x : imageUrl}
        srcSet={imageSrcSet}
        alt={title}
      />
      <Avatar
        src={authorAvatarUrl === '' ? defaultAvatar : authorAvatarUrl}
        alt={authorFullname}
      />
      <Link passHref href={`/${authorUsername}`}>
        <AuthorLink aria-label={`Author: ${authorFullname}`}>
          {authorFullname}
        </AuthorLink>
      </Link>
      <Date aria-label={`Posted on ${formattedDate}`}>{formattedDate}</Date>
      <Title as={isWithinSecondSection ? 'h3' : 'h2'}>
        <Link passHref href={`/${authorUsername}/${slug}`}>
          <TitleLink aria-label={`Read more about ${title}`}>{title}</TitleLink>
        </Link>
      </Title>
      <ClapText aria-label={`${clapCount} claps`}>
        {clapSnapshotExists ? <ClapFilledSVG /> : <ClapSVG />}
        {clapCount}
      </ClapText>
      <CommentText aria-label={`${commentsCount} comments`}>
        <BubbleSVG /> {commentsCount}
      </CommentText>
      <ReadingTime>{readingTime}</ReadingTime>
    </ListItem>
  )
}
