import * as React from 'react'
import { Recipe } from '@lib/types'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import defaultAvatar from '../../assets/default-avatar.png'
import PlaceholderImage4x from '../../assets/placeholder-image4x.jpg'
import PlaceholderImage3x from '../../assets/placeholder-image3x.jpg'
import PlaceholderImage2x from '../../assets/placeholder-image2x.jpg'
import BubbleSVG from '../../assets/bubble.svg'
import TrashSVG from '../../assets/trash.svg'
import PenSVG from '../../assets/pen.svg'
import ClockSVG from '../../assets/clock.svg'
import {
  AuthorAvatar,
  AuthorLink,
  AuthorText,
  CommentLink,
  DateText,
  DeleteButton,
  EditLink,
  RecipeImage,
  Title,
  TopContainer,
  Wrapper,
  MarkDownWrapper,
} from './styles'
import { useUserContext } from '@lib/context'
import { auth, firebaseDb } from '@lib/firebase/firebase'
import {
  collection,
  doc,
  getDocs,
  increment,
  query,
  writeBatch,
} from '@firebase/firestore'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useRealtimeState } from '@hooks/useRealtimeState'
import { ClapButton } from '@components/ClapButton'
import { formatDate } from '@lib/firebase/format-utils'
import { ConfirmationModal } from '@components/ConfirmationModal'
import { useLoadingStore } from '@lib/store'

type Props = {
  recipe: Recipe
  buttons?: React.ReactNode
}

export const RecipeDetail = ({
  recipe: {
    authorUsername,
    createdAt,
    imageUrl,
    authorFullname,
    authorAvatarUrl,
    body,
    title,
    clapCount,
    commentsCount,
    slug,
    uid,
  },
  buttons,
}: Props) => {
  const { username, user } = useUserContext()
  const { push } = useRouter()
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const { setStatus } = useLoadingStore()

  const imageSrcSet =
    imageUrl === ''
      ? `${PlaceholderImage2x.src} 300w, ${PlaceholderImage3x.src} 768w, ${PlaceholderImage4x.src} 1280w`
      : undefined

  const isUserAuthorized = authorUsername === username

  const postPath = `users/${uid}/recipes/${slug}`
  const postRef = doc(firebaseDb, postPath)

  const clapRef = doc(firebaseDb, `${postPath}/claps/${auth.currentUser?.uid}`)
  const userRef = doc(firebaseDb, `users/${uid}`)

  const hasUserClappedRecipe = Boolean(
    useRealtimeState<{ uid: string }>(clapRef.path)?.exists()
  )

  const addRecipeClap = async () => {
    const uid = auth.currentUser?.uid
    const batch = writeBatch(firebaseDb)

    batch.update(userRef, { clapCount: increment(1) })
    batch.update(postRef, { clapCount: increment(1) })
    batch.set(clapRef, { uid })

    await batch.commit()
  }

  const removeRecipeClap = async () => {
    const batch = writeBatch(firebaseDb)

    batch.update(userRef, { clapCount: increment(-1) })
    batch.update(postRef, { clapCount: increment(-1) })
    batch.delete(clapRef)

    await batch.commit()
  }

  const handleClap = () => {
    if (!user) {
      toast.error('You have to be logged in to clap a recipe.')
      return push('/sign-in')
    }

    return hasUserClappedRecipe ? removeRecipeClap() : addRecipeClap()
  }

  const handleDelete = async () => {
    setStatus('loading')

    const batch = writeBatch(firebaseDb)

    batch.update(doc(firebaseDb, `users/${uid}`), {
      clapCount: increment(-clapCount),
      recipeCount: increment(-1),
    })

    const recipePath = `users/${uid}/recipes/${slug}`

    const commentDocs = query(collection(firebaseDb, `${recipePath}/comments`))
    const commentsSnapshot = await getDocs(commentDocs)
    if (commentsSnapshot.docs.length) {
      commentsSnapshot.forEach((commentDoc) => {
        batch.delete(commentDoc.ref)
      })
    }

    batch.delete(doc(firebaseDb, recipePath))

    await batch.commit()

    toast.success('Successfully deleted your recipe.')
    setIsModalOpen(false)
    push(`/${authorUsername}`)
    setStatus('success')
  }

  return (
    <>
      <Wrapper>
        <TopContainer>
          <Title>{title}</Title>
          <AuthorText>
            by{' '}
            <Link passHref href={`/${authorUsername}`}>
              <AuthorLink>{authorFullname}</AuthorLink>
            </Link>{' '}
            <AuthorAvatar
              src={authorAvatarUrl === '' ? defaultAvatar.src : authorAvatarUrl}
              alt={authorFullname}
            />{' '}
          </AuthorText>
          <RecipeImage
            src={imageUrl === '' ? PlaceholderImage2x.src : imageUrl}
            srcSet={imageSrcSet}
            alt={imageUrl === '' ? 'Placeholder' : title}
          />
          <ClapButton
            label="Recipe"
            clapCount={clapCount}
            hasUserClap={hasUserClappedRecipe}
            handleClap={handleClap}
          />
          <Link passHref href="#comments">
            <CommentLink aria-label={`${commentsCount} comments`}>
              <BubbleSVG />
              {commentsCount}
            </CommentLink>
          </Link>
          <DateText>
            {' '}
            <ClockSVG /> Posted on {formatDate(createdAt)}{' '}
          </DateText>
          {isUserAuthorized && (
            <>
              <Link passHref href={`/${authorUsername}/${slug}/edit`}>
                <EditLink aria-label="Edit Recipe">
                  <PenSVG />
                </EditLink>
              </Link>
              <DeleteButton
                aria-label="Delete Recipe"
                onClick={() => setIsModalOpen(true)}
              >
                <TrashSVG />
              </DeleteButton>
            </>
          )}
        </TopContainer>
        <MarkDownWrapper>
          <ReactMarkdown>{body}</ReactMarkdown>
        </MarkDownWrapper>
        {buttons}
      </Wrapper>
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          onSuccess={handleDelete}
          text="Do you really want to delete your recipe?"
        />
      )}
    </>
  )
}
