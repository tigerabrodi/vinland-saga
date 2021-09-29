import * as React from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'
import PlaceholderImage4x from '../../../assets/placeholder-image4x.jpg'
import PlaceholderImage3x from '../../../assets/placeholder-image3x.jpg'
import PlaceholderImage2x from '../../../assets/placeholder-image2x.jpg'
import Eye from '../../../assets/eye.svg'
import Rocket from '../../../assets/rocket.svg'
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
} from './editStyles'
import { useFormState } from '@hooks/useFormState'
import { Router as NextRouter, useRouter } from 'next/router'
import { Recipe } from '@lib/types'
import { useLoadingStore } from '@lib/store'
import { auth, firebaseDb, getRecipeWithSlug } from '@lib/firebase'
import { doc, setDoc } from '@firebase/firestore'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from '@firebase/storage'
import toast from 'react-hot-toast'
import { FullPageSpinner } from '@components/Spinner'
import { useUserContext } from '@lib/context'

type Router = NextRouter & {
  query: {
    slug: string
  }
}

const RecipeEdit: NextPage = () => {
  const {
    handleChange,
    setFormState,
    formState: { title, body },
  } = useFormState({
    title: '',
    body: '',
  })

  const isButtonSaveDisabled = !body.length || title.length < 3

  const [recipe, setRecipe] = React.useState<Recipe | null>(null)
  const [recipeImage, setRecipeImage] = React.useState('')
  const { setStatus } = useLoadingStore()
  const { user } = useUserContext()

  const {
    query: { slug },
  } = useRouter() as Router

  React.useEffect(() => {
    const setRecipeState = async () => {
      setStatus('loading')
      setRecipe(
        (await getRecipeWithSlug(slug, { userToGetRecipeFrom: user })) as Recipe
      )
      setStatus('success')
    }

    if (recipe) {
      setFormState({
        title: recipe.title,
        body: recipe.body,
      })
      setRecipeImage(recipe.imageUrl)
    } else {
      setRecipeState()
    }
  }, [recipe, setFormState, setStatus, slug, user])

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = Array.from(event.target.files as FileList)[0]
    const extension = file.type.split('/')[1]

    const recipeRef = doc(
      firebaseDb,
      `users/${auth.currentUser?.uid}/recipes/${slug}`
    )

    const storage = getStorage()
    const recipeImageRef = ref(storage, `recipes/${slug}.${extension}`)

    setStatus('loading')

    const uploadTask = uploadBytesResumable(recipeImageRef, file)
    uploadTask.on(
      'state_changed',
      () => {},
      () => {
        toast.error('Recipe image upload failed.')
        setStatus('error')
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDoc(recipeRef, { imageUrl: downloadURL }, { merge: true })
          setRecipeImage(downloadURL)
          setStatus('success')
          toast.success('Successfully uploaded your recipe image.')
        })
      }
    )
  }

  if (!recipe) {
    return <FullPageSpinner />
  }

  const imageSrcSet =
    recipeImage === ''
      ? `${PlaceholderImage2x.src} 300w, ${PlaceholderImage3x.src} 768w, ${PlaceholderImage4x.src} 1280w`
      : undefined

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
        src={recipeImage === '' ? PlaceholderImage2x.src : recipe.imageUrl}
        srcSet={imageSrcSet}
        alt={recipeImage === '' ? 'Placeholder' : recipe.title}
      />
      <FileInput
        type="file"
        id="upload"
        accept="image/x-png,image/gif,image/jpeg"
        aria-label="Upload Recipe Image"
        onChange={uploadFile}
      />
      <UploadLabel htmlFor="upload">
        {' '}
        <ImageIcon />{' '}
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
        The body uses{' '}
        <Link passHref href="https://www.markdownguide.org/basic-syntax/">
          <TextLink target="_blank" rel="noopener noreferrer">
            Markdown.
          </TextLink>
        </Link>{' '}
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
  )
}

export default RecipeEdit
