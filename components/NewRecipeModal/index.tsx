import * as React from 'react'
import {
  doc,
  increment,
  serverTimestamp,
  writeBatch,
} from '@firebase/firestore'
import { useFormState } from '@hooks/useFormState'
import { v4 as uuidv4 } from 'uuid'
import { useLoadingStore, useNewRecipeStore } from '@lib/store'
import { Form, CreateButton, Label, Input } from './styles'
import { useUserContext } from '@lib/context'
import { firebaseDb } from '@lib/firebase/firebase'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { Recipe } from '@lib/types'
import { useGetUser } from '@hooks/auth/useGetUser'
import { Modal } from '@components/Modal'
import { stringsKebabCase } from 'all-of-just'

export const NewRecipeModal = () => {
  const {
    handleChange,
    formState: { title },
  } = useFormState({ title: '' })

  const { setIsModalOpen, isModalOpen } = useNewRecipeStore()

  const { setStatus } = useLoadingStore()

  const { push } = useRouter()

  const { username } = useUserContext()

  const { user } = useGetUser(username)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (title.length < 3) {
      toast.error(
        'The title of the recipes must contain at least 3 characters.'
      )
      return
    }

    setStatus('loading')

    if (username && user) {
      // Ensure slug is URL safe and unique
      const slug = encodeURI(stringsKebabCase(title)) + uuidv4()

      const batch = writeBatch(firebaseDb)

      const recipeData: Recipe = {
        title,
        body: '',
        commentsCount: 0,
        clapCount: 0,
        authorUsername: username,
        authorAvatarUrl: user.avatarUrl,
        authorFullname: user.fullname,
        createdAt: serverTimestamp(),
        uid: user.uid,
        imageUrl: '',
        readingTime: '0 min read',
        slug,
      }

      batch.set(
        doc(firebaseDb, `users/${user.uid}/recipes/${slug}`),
        recipeData
      )

      batch.update(doc(firebaseDb, `users/${user.uid}`), {
        recipeCount: increment(1),
      })

      await batch.commit()

      setIsModalOpen(false)
      toast.success(`You successfully created the recipe ${title}.`)
      push(`/${username}/${slug}/edit`)
      setStatus('success')
    }
  }

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      title="Create Recipe"
    >
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="title">Title</Label>
        <Input
          placeholder="Chicken Tikka"
          name="title"
          id="title"
          onChange={handleChange}
          value={title}
        />
        <CreateButton type="submit" aria-disabled={title.length < 3}>
          Create
        </CreateButton>
      </Form>
    </Modal>
  )
}
