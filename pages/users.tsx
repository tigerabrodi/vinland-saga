import { Feed } from '@components/Feed'
import Link from 'next/link'
import type { NextPage } from 'next'
import DummyAvatar from '../cypress/fixtures/tiger-avatar.png'
import RecipeSVG from '../assets/recipe.svg'
import ClapSVG from '../assets/clap.svg'
import {
  UsersList,
  UserItemWrapper,
  AvatarImage,
  Fullname,
  Username,
  Location,
  RecipesCount,
  ClapsCount,
} from './usersStyles'

const UsersFeed: NextPage = () => {
  return (
    <Feed labels={['Hearts', 'Recipes']} title="Users" itemsLength={1}>
      <UsersList>
        <UserItemWrapper>
          <AvatarImage src={DummyAvatar.src} />
          <Fullname>Tiger Abrodi</Fullname>
          <Username>@tigerabrodi</Username>
          <Location>San Diego, California</Location>
          <RecipesCount aria-label={`8 recipes`}>
            <RecipeSVG />
            <span>12</span>
          </RecipesCount>
          <ClapsCount aria-label={`8 claps`}>
            <ClapSVG />
            <span>12</span>
          </ClapsCount>
        </UserItemWrapper>
        <UserItemWrapper>
          <AvatarImage src={DummyAvatar.src} />
          <Fullname>
            <Link passHref href={`/`}>
              <a>Tiger Abrodi</a>
            </Link>
          </Fullname>
          <Username>@tigerabrodi</Username>
          <Location>San Diego, California</Location>
          <RecipesCount aria-label={`8 recipes`}>
            <RecipeSVG />
            <span>12</span>
          </RecipesCount>
          <ClapsCount aria-label={`8 claps`}>
            <ClapSVG />
            <span>12</span>
          </ClapsCount>
        </UserItemWrapper>
        <UserItemWrapper>
          <AvatarImage src={DummyAvatar.src} />
          <Fullname>Tiger Abrodi</Fullname>
          <Username>@tigerabrodi</Username>
          <Location>San Diego, California</Location>
          <RecipesCount aria-label={`8 recipes`}>
            <RecipeSVG />
            <span>12</span>
          </RecipesCount>
          <ClapsCount aria-label={`8 claps`}>
            <ClapSVG />
            <span>12</span>
          </ClapsCount>
        </UserItemWrapper>
      </UsersList>
    </Feed>
  )
}

export default UsersFeed
