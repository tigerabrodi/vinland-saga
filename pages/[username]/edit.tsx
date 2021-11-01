import * as React from 'react'
import Link from 'next/link'
import { auth, firebaseDb } from '@lib/firebase/firebase'
import type { NextPage } from 'next'
import { NextRouter, useRouter } from 'next/router'
import FileUploadSVG from '../../assets/file-upload.svg'
import CancelSVG from '../../assets/close.svg'
import ProfileSVG from '../../assets/profile.svg'
import DefaultAvatar from '../../assets/default-avatar.png'
import {
  Avatar,
  CancelLink,
  UploadInput,
  UploadLabel,
  EditForm,
  HiddenEditTitle,
  VisibleTitle,
  EditWrapper,
  LinkCancel,
  ButtonSave,
  ButtonWrapper,
  Textarea,
  AgeInput,
  Input,
  AgeFormGroup,
  UploadProgress,
} from './editStyles'
import { useLoadingStore } from '@lib/store'
import { FullPageSpinner } from '@components/Spinner'
import { FormGroup, Label } from '@styles/formStyles'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from '@firebase/storage'
import {
  collection,
  collectionGroup,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  writeBatch,
} from '@firebase/firestore'
import toast from 'react-hot-toast'
import { useGetUser } from '@hooks/auth/useGetUser'
import { useUserContext } from '@lib/context'
import { useFormState } from '@hooks/useFormState'

type Router = NextRouter & {
  query: { username: string }
}

const ProfileEdit: NextPage = () => {
  const {
    query: { username: queryUsername },
    push,
  } = useRouter() as Router
  const { setStatus } = useLoadingStore()
  const [uploadProgress, setUploadProgress] = React.useState(0)
  const [avatarImage, setAvatarImage] = React.useState('')

  const { user } = useGetUser(queryUsername)
  const { username } = useUserContext()

  const {
    handleChange,
    formState: { fullname, age, work, location, bio },
    setFormState,
  } = useFormState({
    fullname: '',
    age: '',
    work: '',
    location: '',
    bio: '',
  })

  // TODO Assert this functionality in Test.
  React.useEffect(() => {
    if (queryUsername !== username) {
      toast.error("You are not authorized to edit the user's profile.")
      push('/')
      return
    }

    if (user) {
      setFormState({
        fullname: user.fullname,
        age: user.age,
        work: user.work,
        location: user.location,
        bio: user.bio,
      })
    }
  }, [username, push, setFormState, user, queryUsername])

  const userRef = doc(firebaseDb, `users/${auth.currentUser!.uid}`)

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = Array.from(event.target.files as FileList)[0]
    const extension = file.type.split('/')[1]

    const storage = getStorage()
    const avatarRef = ref(
      storage,
      `avatars/${auth.currentUser!.uid}.${extension}`
    )

    setStatus('loading')

    const uploadTask = uploadBytesResumable(avatarRef, file)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setUploadProgress(progress)
      },
      () => {
        toast.error('Avatar upload did not succeed.')
        setUploadProgress(0)
        setStatus('error')
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDoc(userRef, { avatarUrl: downloadURL }, { merge: true })
          setAvatarImage(downloadURL)
          toast.success('Successfully uploaded your avatar.')
          setStatus('success')
        })
      }
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')

    const batch = writeBatch(firebaseDb)

    const updatedUserProperties = {
      authorAvatarUrl: avatarImage === '' ? user!.avatarUrl : avatarImage,
      authorFullname: fullname,
    }

    const recipeDocs = query(
      collection(firebaseDb, `users/${auth.currentUser!.uid}/recipes`)
    )
    const recipesSnapshot = await getDocs(recipeDocs)
    if (recipesSnapshot.docs.length) {
      recipesSnapshot.forEach((recipeDoc) => {
        batch.update(recipeDoc.ref, updatedUserProperties)
      })
    }

    const commentDocs = query(
      collectionGroup(firebaseDb, 'comments'),
      where('uid', '==', auth.currentUser?.uid)
    )
    const commentsSnapshot = await getDocs(commentDocs)
    if (commentsSnapshot.docs.length) {
      commentsSnapshot.forEach((commentDoc) => {
        batch.update(commentDoc.ref, updatedUserProperties)
      })
    }

    batch.update(userRef, {
      bio,
      work,
      location,
      fullname,
      age,
    })

    await batch.commit()

    toast.success('Successfully updated your profile.')

    push(`/${queryUsername}`)
    setStatus('success')
  }

  if (!user || queryUsername !== username) {
    return <FullPageSpinner />
  }

  const image =
    avatarImage !== ''
      ? avatarImage
      : user.avatarUrl !== ''
      ? user.avatarUrl
      : DefaultAvatar.src

  const isButtonDisabled =
    !fullname.length ||
    !age.length ||
    !work.length ||
    !location.length ||
    !bio.length

  return (
    <EditForm onSubmit={handleSubmit}>
      <EditWrapper>
        <HiddenEditTitle>Editing Profile</HiddenEditTitle>
        <Avatar
          src={image}
          alt={image === DefaultAvatar.src ? 'default' : 'avatar'}
        />
        {uploadProgress !== 0 && (
          <UploadProgress
            role="progressbar"
            aria-valuenow={uploadProgress}
            aria-valuetext="Uploading image"
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {uploadProgress}%
          </UploadProgress>
        )}
        <UploadInput
          type="file"
          id="upload"
          onChange={uploadFile}
          accept="image/x-png,image/gif,image/jpeg"
        />
        <UploadLabel htmlFor="upload">
          Avatar Upload
          <FileUploadSVG />
        </UploadLabel>
        <VisibleTitle aria-hidden="true">Editing Profile</VisibleTitle>

        <Link passHref href={`/${user.username}`}>
          <CancelLink aria-label="Cancel">
            <CancelSVG />
          </CancelLink>
        </Link>
      </EditWrapper>
      <FormGroup>
        <Label htmlFor="fullname">Full Name *</Label>
        <Input
          id="fullname"
          name="fullname"
          type="text"
          placeholder="Naruto Uzumaki"
          value={fullname}
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
          aria-required="true"
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="location">Location *</Label>
        <Input
          id="location"
          name="location"
          type="text"
          placeholder="San Diego, California"
          value={location}
          onChange={handleChange}
          aria-required="true"
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="bio">Biography *</Label>
        <Textarea
          id="bio"
          name="bio"
          placeholder="I’m a Ninja who enjoys cooking and creating new recipes in my spare time."
          value={bio}
          onChange={handleChange}
        />
      </FormGroup>
      <ButtonWrapper>
        <ButtonSave type="submit" disabled={isButtonDisabled}>
          <ProfileSVG />
          Save
        </ButtonSave>
        <Link passHref href={`/${user.username}`}>
          <LinkCancel>Cancel</LinkCancel>
        </Link>
      </ButtonWrapper>
    </EditForm>
  )
}

export default ProfileEdit
