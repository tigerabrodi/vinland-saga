import Link from 'next/link'
import RecipeSVG from '../../assets/recipe.svg'
import defaultAvatar from '../../assets/default-avatar.png'
import ClapSVG from '../../assets/clap.svg'
import {
  ListItem,
  AvatarImage,
  Fullname,
  Username,
  Location,
  RecipesCount,
  ClapsCount,
  UsernameLink,
} from './styles'
import { UserProfile } from '@lib/types'

type Props = {
  user: UserProfile
}

export const UserItem = ({
  user: { username, fullname, location, recipeCount, clapCount, avatarUrl },
}: Props) => (
  <ListItem>
    <AvatarImage
      src={avatarUrl === '' ? defaultAvatar.src : avatarUrl}
      alt={fullname !== '' ? fullname : username}
    />
    <Fullname>{fullname}</Fullname>
    <Username>
      <Link href={`/${username}`} passHref>
        <UsernameLink>@{username}</UsernameLink>
      </Link>
    </Username>
    <Location>{location}</Location>
    <RecipesCount aria-label={`${recipeCount} recipes`}>
      <RecipeSVG />
      <span>{recipeCount}</span>
    </RecipesCount>
    <ClapsCount aria-label={`${clapCount} claps`}>
      <ClapSVG />
      <span>{clapCount}</span>
    </ClapsCount>
  </ListItem>
)
