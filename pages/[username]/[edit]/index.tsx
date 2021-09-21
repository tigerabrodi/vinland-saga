import * as React from "react";
import { auth, firebaseDb } from "@lib/firebase";
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
  ButtonCancel,
  ButtonSave,
  ButtonWrapper,
  Profile,
  Textarea,
  AgeInput,
  Input,
  AgeFormGroup,
  UploadProgress,
} from "./styles";
import { useLoadingStore } from "@lib/store";
import { FullPageSpinner } from "@components/Spinner";
import { FormGroup, Label } from "@styles/sharedStyles";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "@firebase/storage";
import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
import toast from "react-hot-toast";
import { useGetUser } from "@hooks/useGetUser";

type Router = NextRouter & {
  query: { username: string };
};

type FormState = {
  fullname: string;
  age: string;
  work: string;
  location: string;
  bio: string;
};

const UsernameEdit: NextPage = () => {
  const {
    query: { username },
    push,
  } = useRouter() as Router;
  const { setStatus } = useLoadingStore();
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);
  const [avatarImage, setAvatarImage] = React.useState<string>("");

  const { user } = useGetUser(username);

  const [formState, setFormState] = React.useState<FormState>({
    fullname: "",
    age: "",
    work: "",
    location: "",
    bio: "",
  });

  const { fullname, age, work, location, bio } = formState;

  React.useEffect(() => {
    if (user) {
      setFormState({
        fullname: user.fullname,
        age: user.age,
        work: user.work,
        location: user.location,
        bio: user.bio,
      });
    }
  }, [user]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = Array.from(event.target.files as FileList)[0];
    const extension = file.type.split("/")[1];

    const userRef = doc(firebaseDb, "users", auth.currentUser!.uid);

    const storage = getStorage();
    const avatarRef = ref(
      storage,
      `avatars/${auth.currentUser!.uid}.${extension}`
    );

    setStatus("loading");

    const uploadTask = uploadBytesResumable(avatarRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      () => {
        toast.error("Avatar upload did not succeed.");
        setUploadProgress(0);
        setStatus("error");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDoc(userRef, { avatarUrl: downloadURL }, { merge: true });
          setAvatarImage(downloadURL);
          setStatus("success");
          toast.success("Successfully uploaded your avatar.");
        });
      }
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userRef = doc(firebaseDb, "users", auth.currentUser!.uid);

    setStatus("loading");
    setDoc(
      userRef,
      {
        bio,
        work,
        location,
        fullname,
        age,
        joined: serverTimestamp(),
      } as UserProfile,
      { merge: true }
    );
    setStatus("success");

    toast.success("Successfully updated your profile.");

    push(`/${username}`);
  };

  if (!user) {
    return <FullPageSpinner />;
  }

  const image =
    avatarImage !== ""
      ? avatarImage
      : user.avatarUrl !== ""
      ? user.avatarUrl
      : DefaultAvatar.src;

  const isButtonDisabled =
    !fullname.length || !age.length || !work.length || !location.length;

  return (
    <UserEditForm onSubmit={handleSubmit}>
      <UserEditWrapper>
        <UserEditTitle>Editing Profile</UserEditTitle>
        <Avatar
          src={image}
          alt={image === DefaultAvatar.src ? "default" : "avatar"}
        />
        {uploadProgress !== 0 && (
          <UploadProgress>{uploadProgress}%</UploadProgress>
        )}
        <UploadInput
          type="file"
          id="upload"
          onChange={uploadFile}
          accept="image/x-png,image/gif,image/jpeg"
        />
        <UploadLabel htmlFor="upload">
          Avatar Upload
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
      <FormGroup>
        <Label htmlFor="fullname">Full Name *</Label>
        <Input
          id="fullname"
          name="fullname"
          type="text"
          placeholder="Naruto Uzumaki"
          value={fullname}
          onChange={(event) => handleChange(event)}
          aria-required="true"
        />
      </FormGroup>
      <AgeFormGroup>
        <Label htmlFor="age">Age *</Label>
        <AgeInput
          id="age"
          name="age"
          type="number"
          placeholder="20"
          value={age}
          onChange={(event) => handleChange(event)}
          aria-required="true"
        />
      </AgeFormGroup>
      <FormGroup>
        <Label htmlFor="work">Work *</Label>
        <Input
          id="work"
          name="work"
          type="text"
          placeholder="Chef at Starship"
          value={work}
          onChange={(event) => handleChange(event)}
          aria-required="true"
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="location">Location *</Label>
        <Input
          id="location"
          name="location"
          type="text"
          placeholder="Los Angeles, California"
          value={location}
          onChange={(event) => handleChange(event)}
          aria-required="true"
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="bio">Biography</Label>
        <Textarea
          id="bio"
          name="bio"
          placeholder="I’m a Ninja who enjoys cooking and creating new recipes in my spare time."
          value={bio}
          onChange={(event) => handleChange(event)}
        />
      </FormGroup>
      <ButtonWrapper>
        <ButtonSave type="submit" disabled={isButtonDisabled}>
          <Profile />
          Save
        </ButtonSave>
        <ButtonCancel onClick={() => push(`/${user.username}`)}>
          Cancel
        </ButtonCancel>
      </ButtonWrapper>
    </UserEditForm>
  );
};

export default UsernameEdit;
