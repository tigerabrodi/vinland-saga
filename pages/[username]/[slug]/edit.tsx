import * as React from "react";
import Link from "next/link";
import type { NextPage } from "next";
import PlaceholderImage from "@assets/placeholder-image.jpg";
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
  Rocket,
  Eye,
} from "./editStyles";
import { useFormState } from "@hooks/useFormState";

const RecipeEdit: NextPage = () => {
  const { handleChange, formState } = useFormState({
    title: "",
    body: "",
  });

  const { title, body } = formState;

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
        />
      </TitleFormGroup>
      <Image src={PlaceholderImage.src} alt="Placeholder image" />
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
        <Textarea id="body" name="body" value={body} onChange={handleChange} />
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
        <ButtonSave>
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
