import Link from 'next/link'
import { firebaseDb } from '@lib/firebase/firebase'
import defaultAvatar from '../../assets/default-avatar.png'
import PenSVG from '../../assets/pen.svg'
import { Recipe, UserProfile } from '@lib/types'
import type { NextPage } from 'next'
import { useUserContext } from '@lib/context'
import {
  Avatar,
  EditLink,
  ProfileTitle,
  ProfileUsername,
  RecipesSection,
  ProfileText,
  ProfileSection,
  HiddenProfileTitle,
  RecipesHeading,
  NoRecipesText,
  NewRecipeButton,
  Wrapper,
  Dot,
  Line,
} from './styles'
import {
  Timestamp,
  query as fbQuery,
  collection,
  where,
  getDocs,
  CollectionReference,
} from '@firebase/firestore'
import { FullPageSpinner } from '@components/Spinner'
import { useNewRecipeStore } from '@lib/store'
import { RecipesFeed } from '@components/RecipesFeed'
import { getUserWithUsername } from '@lib/firebase/get-utils'
import { dataToJSON } from '@lib/firebase/format-utils'

type ServerProps = {
  query: {
    username: string
  }
}

export async function getServerSideProps({ query }: ServerProps) {
  const { username } = query

  const user = await getUserWithUsername(username)

  const recipeDocs = fbQuery<Recipe>(
    collection(
      firebaseDb,
      `chefs/${user?.uid}/recipes`
    ) as CollectionReference<Recipe>,
    where('authorUsername', '==', username)
  )

  const recipesSnapshot = await getDocs<Recipe>(recipeDocs)

  const recipes = recipesSnapshot.docs.map((recipeDoc) => dataToJSON(recipeDoc))

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

  const createdAt = (
    typeof user.createdAt === 'number'
      ? new Date(user.createdAt)
      : (user.createdAt as Timestamp).toDate()
  )
    .toISOString()
    .split('T')[0]

  if (!user) {
    return <FullPageSpinner />
  }

  const isUserAuthorized = user.username === username

  return (
    <>
      <Wrapper>
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
                <PenSVG />
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
            <span>Since {createdAt}</span>
          </ProfileText>
          <Line />
        </ProfileSection>
        <RecipesSection>
          <RecipesHeading>Recipes</RecipesHeading>
          {recipes.length ? (
            <RecipesFeed recipes={recipes} isWithinSecondSection />
          ) : isUserAuthorized ? (
            <>
              <NoRecipesText>
                You currently have written no recipes.
              </NoRecipesText>
              <NewRecipeButton onClick={() => setIsModalOpen(true)}>
                New Recipe
              </NewRecipeButton>
            </>
          ) : (
            <NoRecipesText>
              @{user.username} has currently have written no recipes.
            </NoRecipesText>
          )}
        </RecipesSection>
      </Wrapper>
    </>
  )
}

export default Profile
