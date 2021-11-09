import Link from 'next/link'
import { firebaseDb } from '@lib/firebase/firebase'
import defaultAvatar from '../../assets/default-avatar.png'
import PenSVG from '../../assets/pen.svg'
import { Recipe, ChefProfile } from '@lib/types'
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
} from '../../styles/profileStyles'
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
import { getChefWithUsername } from '@lib/firebase/get-utils'
import { dataToJSON } from '@lib/firebase/format-utils'

type ServerProps = {
  query: {
    username: string
  }
}

export async function getServerSideProps({ query }: ServerProps) {
  const { username } = query

  const chef = await getChefWithUsername(username)

  const recipeDocs = fbQuery<Recipe>(
    collection(
      firebaseDb,
      `chefs/${chef?.uid}/recipes`
    ) as CollectionReference<Recipe>,
    where('authorUsername', '==', username)
  )

  const recipesSnapshot = await getDocs<Recipe>(recipeDocs)

  const recipes = recipesSnapshot.docs.map((recipeDoc) => dataToJSON(recipeDoc))

  if (!chef) {
    return {
      notFound: true,
    }
  }

  return {
    props: { chef, recipes },
  }
}

type Props = {
  chef: ChefProfile
  recipes: Recipe[]
}

const Profile: NextPage<Props> = ({ chef, recipes }) => {
  const { username } = useUserContext()

  const { setIsModalOpen } = useNewRecipeStore()

  const createdAt = (
    typeof chef.createdAt === 'number'
      ? new Date(chef.createdAt)
      : (chef.createdAt as Timestamp).toDate()
  )
    .toISOString()
    .split('T')[0]

  if (!chef) {
    return <FullPageSpinner />
  }

  const isUserAuthorized = chef.username === username

  return (
    <>
      <Wrapper>
        <ProfileSection>
          <HiddenProfileTitle>{chef.fullname}</HiddenProfileTitle>
          <Avatar
            src={chef.avatarUrl === '' ? defaultAvatar.src : chef.avatarUrl}
            alt={chef.fullname}
          />
          <ProfileUsername>@{chef.username}</ProfileUsername>
          <ProfileTitle
            aria-hidden="true"
            isNotAuthorizedUser={!isUserAuthorized}
          >
            {chef.fullname}
          </ProfileTitle>
          {isUserAuthorized && (
            <Link passHref href={`/${username}/edit`}>
              <EditLink aria-label="Edit Your Profile">
                <PenSVG />
              </EditLink>
            </Link>
          )}
          <ProfileText>
            <span>Age {chef.age}</span>
            <Dot />
            <span>Located in {chef.location}</span> <Dot />
            <span>{chef.bio}</span>
            <Dot />
            <span>{chef.work}</span>
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
              @{chef.username} has currently have written no recipes.
            </NoRecipesText>
          )}
        </RecipesSection>
      </Wrapper>
    </>
  )
}

export default Profile
