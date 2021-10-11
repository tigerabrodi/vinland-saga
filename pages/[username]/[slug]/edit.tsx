import * as React from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'
import PlaceholderImage4x from '../../../assets/placeholder-image4x.jpg'
import PlaceholderImage3x from '../../../assets/placeholder-image3x.jpg'
import PlaceholderImage2x from '../../../assets/placeholder-image2x.jpg'
import Eye from '../../../assets/eye.svg'
import Rocket from '../../../assets/rocket.svg'
import {
  RecipeEditWrapper,
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
import { useGetUser } from '@hooks/auth/useGetUser'
import { RecipeDetail } from '@components/RecipeDetail'
import { useUnload } from '@hooks/useUnload'

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
  const [recipe, setRecipe] = React.useState<Recipe | null>(null)
  const [recipeImage, setRecipeImage] = React.useState('')
  const [isPreview, setIsPreview] = React.useState(false)
  const { setStatus } = useLoadingStore()
  const { user: currentAuthUser, username } = useUserContext()

  const isButtonSaveDisabled = !body.length || title.length < 3

  const {
    query: { slug },
    push,
  } = useRouter() as Router

  const { user } = useGetUser(username)

  React.useEffect(() => {
    const setRecipeState = async () => {
      setStatus('loading')
      setRecipe(
        (await getRecipeWithSlug(slug, {
          userToGetRecipeFrom: currentAuthUser,
        })) as Recipe
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
  }, [recipe, setFormState, setStatus, slug, currentAuthUser])

  useUnload((event) => {
    event.preventDefault()
    const exit = confirm(
      'Are you sure you want to leave? Changes may get lost if you do.'
    )
    if (exit) window.close()
  })

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = Array.from(event.target.files as FileList)[0]
    const extension = file.type.split('/')[1]

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
          setDoc(
            doc(firebaseDb, `users/${auth.currentUser?.uid}/recipes/${slug}`),
            { imageUrl: downloadURL },
            { merge: true }
          )
          setRecipeImage(downloadURL)
          toast.success('Successfully uploaded your recipe image.')
          setStatus('success')
        })
      }
    )
  }

  if (!recipe || !user) {
    return <FullPageSpinner />
  }

  const imageSrcSet =
    recipeImage === ''
      ? `${PlaceholderImage2x.src} 300w, ${PlaceholderImage3x.src} 768w, ${PlaceholderImage4x.src} 1280w`
      : undefined

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (username) {
      const uid = auth.currentUser!.uid

      const wordCount = body.trim().split(/\s+/g).length
      const minutesToRead = (wordCount / 100 + 1).toFixed(0)

      const recipeData = {
        title,
        body,
        readingTime: `${minutesToRead} min read`,
      } as Recipe

      await setDoc(
        doc(firebaseDb, `users/${uid}/recipes/${recipe.slug}`),
        recipeData,
        { merge: true }
      )

      toast.success(`Successfully updated your recipe ${title}.`)

      push(`/${username}/${recipe.slug}`)
      setStatus('success')
    }
  }

  const Buttons = () => (
    <ButtonWrapper>
      <ButtonSave disabled={isButtonSaveDisabled} type="submit">
        <Rocket /> Submit
      </ButtonSave>
      <ButtonPreview
        type="button"
        onClick={() => setIsPreview(!isPreview)}
        aria-pressed={isPreview}
      >
        <Eye />
        Preview
      </ButtonPreview>
    </ButtonWrapper>
  )

  return (
    <form onSubmit={handleSubmit}>
      {isPreview ? (
        <RecipeDetail
          recipe={{ ...recipe, imageUrl: recipeImage, title, body }}
          buttons={<Buttons />}
        />
      ) : (
        <RecipeEditWrapper>
          <Heading>Edit Recipe</Heading>
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
          <Buttons />
        </RecipeEditWrapper>
      )}
    </form>
  )
}

export default RecipeEdit
