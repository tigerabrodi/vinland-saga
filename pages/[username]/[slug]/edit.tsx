import * as React from "react";
import Link from "next/link";
import type { NextPage } from "next";
import PlaceholderImage4x from "../../../assets/placeholder-image4x.jpg";
import PlaceholderImage3x from "../../../assets/placeholder-image3x.jpg";
import PlaceholderImage2x from "../../../assets/placeholder-image2x.jpg";
import Eye from "../../../assets/eye.svg";
import Rocket from "../../../assets/rocket.svg";
import {
  RecipeEditForm,
  Heading,
  TitleFormGroup,
  Label,
  UploadLabel,
  Input,
  FileInput,
  ImageIcon,
  Image,
  BodyFormGroup,
  Textarea,
  Text,
  TextLink,
  ButtonWrapper,
  ButtonSave,
  ButtonPreview,
} from "./editStyles";
import { useFormState } from "@hooks/useFormState";

const RecipeEdit: NextPage = () => {
  const {
    handleChange,
    formState: { title, body },
  } = useFormState({
    title: "",
    body: "",
  });

  const isButtonSaveDisabled = !body.length || title.length < 3;

  return (
    <RecipeEditForm>
      <Heading>Create Recipe</Heading>
      <TitleFormGroup>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={title}
          type="text"
          onChange={handleChange}
          placeholder="Chicken Tikka"
        />
      </TitleFormGroup>
      <Image
        src={PlaceholderImage2x.src}
        srcSet={`${PlaceholderImage2x.src} 300w, ${PlaceholderImage3x.src} 768w, ${PlaceholderImage4x.src} 1280w`}
        alt="Placeholder"
      />
      <FileInput
        type="file"
        id="upload"
        accept="image/x-png,image/gif,image/jpeg"
        aria-label="Upload Recipe Image"
      />
      <UploadLabel htmlFor="upload">
        {" "}
        <ImageIcon />{" "}
      </UploadLabel>
      <BodyFormGroup>
        <Label htmlFor="body">Body</Label>
        <Textarea
          id="body"
          name="body"
          value={body}
          onChange={handleChange}
          placeholder="# Chicken Tikka Masala Recipe"
        />
      </BodyFormGroup>
      <Text>
        The body uses{" "}
        <Link passHref href="https://www.markdownguide.org/basic-syntax/">
          <TextLink target="_blank" rel="noopener noreferrer">
            Markdown.
          </TextLink>
        </Link>{" "}
        A simple and easy-to-use markup language.
      </Text>

      <ButtonWrapper>
        <ButtonSave disabled={isButtonSaveDisabled}>
          <Rocket /> Submit
        </ButtonSave>
        <ButtonPreview>
          <Eye />
          Preview
        </ButtonPreview>
      </ButtonWrapper>
    </RecipeEditForm>
  );
};

export default RecipeEdit;
