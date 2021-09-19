import * as React from "react";
import { getUserWithUsername } from "@lib/firebase";
import type { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { UserProfile } from "@lib/types";
import DefaultAvatar from "../../../assets/default-avatar.png";
import {
  Avatar,
  Cancel,
  CancelButton,
  UploadInput,
  UploadLabel,
  UserEditForm,
  UserEditTitle,
  UserEditVisibleTitle,
  UserEditWrapper,
  FileUpload,
} from "./styles";
import { useLoadingStore } from "@lib/store";
import { FullPageSpinner } from "@components/Spinner";

type Router = NextRouter & {
  query: { username: string };
};

const UsernameEdit: NextPage = () => {
  const { query, push } = useRouter() as Router;
  const { setStatus } = useLoadingStore();
  const [user, setUser] = React.useState<UserProfile | null>(null);

  React.useEffect(() => {
    const setUserState = async () => {
      setStatus("loading");
      setUser((await getUserWithUsername(query.username)) as UserProfile);
      setStatus("success");
    };
    setUserState();
  }, [query.username, setStatus]);

  const uploadFile = () => {};

  if (!user) {
    return <FullPageSpinner />;
  }

  const avatarImage =
    user.avatarUrl === "" ? DefaultAvatar.src : user.avatarUrl;

  return (
    <UserEditForm>
      <UserEditWrapper>
        <UserEditTitle>Editing Profile</UserEditTitle>
        <Avatar src={avatarImage} />
        <UploadInput
          aria-labelledby="upload"
          type="file"
          id="upload"
          onChange={uploadFile}
          accept="image/x-png,image/gif,image/jpeg"
        />
        <UploadLabel htmlFor="upload">
          Upload Image
          <FileUpload />
        </UploadLabel>
        <UserEditVisibleTitle aria-hidden="true">
          Editing Profile
        </UserEditVisibleTitle>
        <CancelButton
          aria-label="Cancel"
          onClick={() => push(`/${user.username}`)}
        >
          <Cancel />
        </CancelButton>
      </UserEditWrapper>
    </UserEditForm>
  );
};

export default UsernameEdit;
