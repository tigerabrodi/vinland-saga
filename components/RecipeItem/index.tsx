import { Recipe } from '@lib/types'
import defaultAvatar from '../../assets/default-avatar.png'
import PlaceholderImage4x from '../../assets/placeholder-image4x.jpg'
import PlaceholderImage3x from '../../assets/placeholder-image3x.jpg'
import PlaceholderImage2x from '../../assets/placeholder-image2x.jpg'
import ClapSVG from '../../assets/clap.svg'
import BubbleSVG from '../../assets/bubble.svg'
import Link from 'next/link'
import {
  RecipeListItem,
  RecipeImage,
  RecipeAvatar,
  AuthorLink,
  Date,
  RecipeTitle,
  ClapText,
  CommentText,
  ReadingTime,
  RecipeTitleLink,
} from './styles'
import { formatDate } from '@lib/firebase'

type Props = {
  recipe: Recipe
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
  },
}: Props) => {
  const imageSrcSet =
    imageUrl === ''
      ? `${PlaceholderImage2x.src} 300w, ${PlaceholderImage3x.src} 768w, ${PlaceholderImage4x.src} 1280w`
      : undefined

  const formattedDate = formatDate(createdAt)

  return (
    <RecipeListItem aria-label={`Read the recipe ${title}`}>
      <RecipeImage
        src={imageUrl === '' ? PlaceholderImage2x.src : imageUrl}
        srcSet={imageSrcSet}
        alt={title}
      />
      <RecipeAvatar
        src={authorAvatarUrl === '' ? defaultAvatar.src : authorAvatarUrl}
        alt={authorFullname}
      />
      <Link passHref href={`/${authorUsername}`}>
        <AuthorLink aria-label={`Author: ${authorFullname}`}>
          {authorFullname}
        </AuthorLink>
      </Link>
      <Date aria-label={`Posted on ${formattedDate}`}>{formattedDate}</Date>
      <RecipeTitle>
        <Link passHref href={`/${authorUsername}/${slug}`}>
          <RecipeTitleLink>{title}</RecipeTitleLink>
        </Link>
      </RecipeTitle>
      <ClapText aria-label={`${clapCount} claps`}>
        <ClapSVG />
        {clapCount}
      </ClapText>
      <CommentText>
        <BubbleSVG /> {commentsCount}
      </CommentText>
      <ReadingTime>{readingTime}</ReadingTime>
    </RecipeListItem>
  )
}
