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
  FullnameLink,
} from './styles'
import { UserProfile } from '@lib/types'

type Props = {
  user: UserProfile
}

export const UserItem = ({
  user: { username, fullname, location, recipeCount, clapCount, avatarUrl },
}: Props) => (
  <ListItem>
    <AvatarImage src={avatarUrl === '' ? defaultAvatar.src : avatarUrl} />
    <Fullname>
      <Link href={`/${username}`} passHref>
        <FullnameLink>{fullname}</FullnameLink>
      </Link>
    </Fullname>
    <Username>@{username}</Username>
    <Location>{location}</Location>
    <RecipesCount aria-label={`${recipeCount} recipes`}>
      <RecipeSVG />
      <span>12</span>
    </RecipesCount>
    <ClapsCount aria-label={`${clapCount} claps`}>
      <ClapSVG />
      <span>12</span>
    </ClapsCount>
  </ListItem>
)
