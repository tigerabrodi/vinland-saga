import * as React from 'react'
import { Recipe } from '@lib/types'
import defaultAvatar from '../../assets/default-avatar.png'
import PlaceholderImage4x from '../../assets/placeholder-image4x.jpg'
import PlaceholderImage3x from '../../assets/placeholder-image3x.jpg'
import PlaceholderImage2x from '../../assets/placeholder-image2x.jpg'
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
      ? `${PlaceholderImage2x.src} 300w, ${PlaceholderImage3x.src} 768w, ${PlaceholderImage4x.src} 1280w`
      : undefined

  const formattedDate = formatDate(createdAt)

  React.useEffect(() => {
    const checkClapExists = async () => {
      const clapRef = doc(
        firebaseDb,
        `users/${uid}/recipes/${slug}/claps/${auth.currentUser?.uid}`
      )

      const clapSnap = await getDoc(clapRef)

      setClapSnapshotExists(Boolean(clapSnap.exists()))
    }

    checkClapExists()
  }, [slug, uid])

  return (
    <ListItem aria-label={title}>
      <Image
        src={imageUrl === '' ? PlaceholderImage2x.src : imageUrl}
        srcSet={imageSrcSet}
        alt={title}
      />
      <Avatar
        src={authorAvatarUrl === '' ? defaultAvatar.src : authorAvatarUrl}
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
