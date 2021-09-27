import Link from "next/link";
import { getUserWithUsername } from "@lib/firebase";
import defaultAvatar from "../../assets/default-avatar.png";
import { UserProfile } from "@lib/types";
import type { NextPage } from "next";
import { useUserContext } from "@lib/context";
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
} from "./styles";
import { Timestamp } from "@firebase/firestore";
import { FullPageSpinner } from "@components/Spinner";
import { NewRecipeModal } from "@components/NewRecipeModal";
import { useNewRecipeStore } from "@lib/store";

type ServerProps = {
  query: {
    username: string;
  };
};

// TODO Show user's recipes if they exist, otherwise no recipes found section.
export async function getServerSideProps({ query }: ServerProps) {
  const { username } = query;

  const user = await getUserWithUsername(username);

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: { user },
  };
}

type Props = {
  user: UserProfile;
};

const Username: NextPage<Props> = ({ user }) => {
  const { username } = useUserContext();

  const { setIsModalOpen } = useNewRecipeStore();

  const joined = (
    typeof user.joined === "number"
      ? new Date(user.joined)
      : (user.joined as Timestamp).toDate()
  )
    .toISOString()
    .split("T")[0];

  if (!user) {
    return <FullPageSpinner />;
  }

  return (
    <>
      <UsernameWrapper>
        <ProfileSection>
          <HiddenProfileTitle>{user.fullname}</HiddenProfileTitle>
          <Avatar
            src={user.avatarUrl === "" ? defaultAvatar.src : user.avatarUrl}
            alt={user.fullname}
          />
          <ProfileUsername>@{user.username}</ProfileUsername>
          <ProfileTitle
            aria-hidden="true"
            isNotAuthorizedUser={user.username !== username}
          >
            {user.fullname}
          </ProfileTitle>
          {user.username === username && (
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
          <NoRecipesText>You currently have written no recipes.</NoRecipesText>
          <NewRecipeButton onClick={() => setIsModalOpen(true)}>
            New Recipe
          </NewRecipeButton>
        </RecipesSection>
      </UsernameWrapper>
      <NewRecipeModal />
    </>
  );
};

export default Username;
