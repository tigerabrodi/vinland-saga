import Link from 'next/link'
import { firebaseDb, getUserWithUsername } from '@lib/firebase/firebase'
import defaultAvatar from '../../assets/default-avatar.png'
import { Recipe, UserProfile } from '@lib/types'
import type { NextPage } from 'next'
import { useUserContext } from '@lib/context'
import {
  Avatar,
  EditLink,
  Pen,
  ProfileTitle,
  ProfileUsername,
  RecipesSection,
  ProfileText,
  ProfileSection,
  HiddenProfileTitle,
  RecipesHeading,
  NoRecipesText,
  NewRecipeButton,
  UsernameWrapper,
  Dot,
  Line,
} from './styles'
import {
  Timestamp,
  query as fbQuery,
  collection,
  where,
  getDocs,
} from '@firebase/firestore'
import { FullPageSpinner } from '@components/Spinner'
import { useNewRecipeStore } from '@lib/store'
import { RecipesFeed } from '@components/RecipesFeed'
import { recipeToJSON } from '@lib/firebase/format-utils'

type ServerProps = {
  query: {
    username: string
  }
}

export async function getServerSideProps({ query }: ServerProps) {
  const { username } = query

  const user = await getUserWithUsername(username)

  const recipeDocs = fbQuery(
    collection(firebaseDb, `users/${user?.uid}/recipes`),
    where('authorUsername', '==', username)
  )

  const recipesSnapshot = await getDocs(recipeDocs)

  const recipes = recipesSnapshot.docs.map((recipeDoc) =>
    recipeToJSON(recipeDoc)
  )

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: { user, recipes },
  }
}

type Props = {
  user: UserProfile
  recipes: Recipe[]
}

const Profile: NextPage<Props> = ({ user, recipes }) => {
  const { username } = useUserContext()

  const { setIsModalOpen } = useNewRecipeStore()

  const joined = (
    typeof user.joined === 'number'
      ? new Date(user.joined)
      : (user.joined as Timestamp).toDate()
  )
    .toISOString()
    .split('T')[0]

  if (!user) {
    return <FullPageSpinner />
  }

  const isUserAuthorized = user.username === username

  return (
    <>
      <UsernameWrapper>
        <ProfileSection>
          <HiddenProfileTitle>{user.fullname}</HiddenProfileTitle>
          <Avatar
            src={user.avatarUrl === '' ? defaultAvatar.src : user.avatarUrl}
            alt={user.fullname}
          />
          <ProfileUsername>@{user.username}</ProfileUsername>
          <ProfileTitle
            aria-hidden="true"
            isNotAuthorizedUser={!isUserAuthorized}
          >
            {user.fullname}
          </ProfileTitle>
          {isUserAuthorized && (
            <Link passHref href={`/${username}/edit`}>
              <EditLink aria-label="Edit Your Profile">
                <Pen />
              </EditLink>
            </Link>
          )}
          <ProfileText>
            <span>Age {user.age}</span>
            <Dot />
            <span>Located in {user.location}</span> <Dot />
            <span>{user.bio}</span>
            <Dot />
            <span>{user.work}</span>
            <Dot />
            <span>Since {joined}</span>
          </ProfileText>
          <Line />
        </ProfileSection>
        <RecipesSection>
          <RecipesHeading>Recipes</RecipesHeading>
          {recipes.length ? (
            <RecipesFeed recipes={recipes} isWithinSecondSection />
          ) : (
            <>
              <NoRecipesText>
                {isUserAuthorized
                  ? 'You currently have written no recipes.'
                  : `${user.fullname} has currently have written no recipes.`}
              </NoRecipesText>
              <NewRecipeButton onClick={() => setIsModalOpen(true)}>
                New Recipe
              </NewRecipeButton>
            </>
          )}
        </RecipesSection>
      </UsernameWrapper>
    </>
  )
}

export default Profile
