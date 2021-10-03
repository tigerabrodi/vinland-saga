import * as React from 'react'
import { doc, serverTimestamp, setDoc } from '@firebase/firestore'
import { useFocusTrap } from '@hooks/useFocusTrap'
import { useFormState } from '@hooks/useFormState'
import { v4 as uuidv4 } from 'uuid'
import kebabCase from 'lodash.kebabcase'
import { useLoadingStore, useNewRecipeStore } from '@lib/store'
import {
  Modal,
  ModalBackground,
  Form,
  Title,
  CreateButton,
  Close,
  CloseButton,
  Label,
  Input,
} from './styles'
import { useCloseEscape } from '@hooks/useCloseEscape'
import { useClickOutside } from '@hooks/useClickOutside'
import { useUserContext } from '@lib/context'
import { auth, firebaseDb } from '@lib/firebase'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

export const NewRecipeModal = () => {
  const {
    handleChange,
    formState: { title },
  } = useFormState({ title: '' })

  const { setIsModalOpen, isModalOpen } = useNewRecipeStore()

  const { setStatus } = useLoadingStore()

  const modalRef = useFocusTrap(isModalOpen)

  useClickOutside({
    ref: modalRef,
    callback: () => setIsModalOpen(false),
    shouldTriggerCallback: isModalOpen,
  })

  useCloseEscape(() => setIsModalOpen(false))

  const { push } = useRouter()

  const { username } = useUserContext()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setStatus('loading')

    let createdAt = null
    do {
      createdAt = serverTimestamp()
    } while (createdAt === null)

    if (username) {
      const uid = auth.currentUser!.uid

      // Ensure slug is URL safe and unique
      const slug = encodeURI(kebabCase(title)) + uuidv4()

      const recipeData = {
        title,
        body: '',
        commentsCount: 0,
        clapCount: 0,
        username,
        createdAt,
        uid,
        imageUrl: '',
        slug,
      }

      await setDoc(doc(firebaseDb, `users/${uid}/recipes/${slug}`), recipeData)

      setStatus('success')
      toast.success(`You successfully created the recipe ${title}.`)

      push(`/${username}/${slug}/edit`)
    }
  }

  return isModalOpen ? (
    <>
      <Modal
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        ref={modalRef}
      >
        <Title id="modalTitle">Create Recipe</Title>
        <CloseButton
          type="button"
          onClick={() => setIsModalOpen(false)}
          aria-label="Close"
        >
          <Close />
        </CloseButton>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="title">Title</Label>
          <Input
            placeholder="Chicken Tikka"
            name="title"
            id="title"
            onChange={handleChange}
            value={title}
          />
          <CreateButton type="submit" disabled={title.length < 3}>
            Create
          </CreateButton>
        </Form>
      </Modal>
      <ModalBackground />
    </>
  ) : null
}
