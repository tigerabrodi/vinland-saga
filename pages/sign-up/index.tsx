import * as React from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { FormIsValidText } from '../../styles/signUpStyles'
import { functionsDebounce } from 'all-of-just'
import { doc, getDoc } from '@firebase/firestore'
import { firebaseDb } from '@lib/firebase/firebase'
import { useCreateUserWithEmailAndPassword } from '@hooks/auth/useCreateUserWithEmailAndPassword'
import { useLoadingStore } from '@lib/store'
import {
  FormGroup,
  Input,
  Label,
  SignSection,
  SignTitle,
  Form,
  SwitchLink,
  SwitchText,
  SubmitButton,
  FormError,
} from '@styles/formStyles'
import { useFormState } from '@hooks/useFormState'
import { Metatags } from '@components/Metatags'

const SignUp: NextPage = () => {
  const [isUsernameError, setIsUsernameError] = React.useState(false)
  const [isUsernameValid, setIsUsernameValid] = React.useState(false)
  const [isEmailInvalid, setIsEmailInvalid] = React.useState(false)
  const [isEmailError, setIsEmailError] = React.useState(false)
  const [isEmailTaken, setIsEmailTaken] = React.useState(false)
  const [isPasswordError, setIsPasswordError] = React.useState(false)
  const [isConfirmPasswordError, setIsConfirmPasswordError] =
    React.useState(false)

  const {
    handleChange,
    formState: { username, password, confirmPassword, email },
  } = useFormState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  })

  const { setStatus } = useLoadingStore()

  const { createUserWithEmailAndPassword, signUpError } =
    useCreateUserWithEmailAndPassword()

  const isAnyFieldEmpty =
    !username.length ||
    !password.length ||
    !confirmPassword.length ||
    !email.length

  const canUserSignUp = () => {
    const isPasswordTooShort = password.length < 6
    if (isPasswordTooShort) {
      setIsPasswordError(true)
      return setTimeout(() => {
        setIsPasswordError(false)
      }, 3000)
    }

    const isPasswordNotMatching = password !== confirmPassword
    if (isPasswordNotMatching) {
      setIsConfirmPasswordError(true)
      return setTimeout(() => {
        setIsConfirmPasswordError(false)
      }, 3000)
    }

    if (isEmailInvalid) {
      setIsEmailError(true)
      return setTimeout(() => {
        setIsEmailError(false)
      }, 3000)
    }

    return true
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsEmailTaken(false)
    setIsEmailError(false)

    if (canUserSignUp() === true) {
      createUserWithEmailAndPassword(email, password, username)
    }
  }

  // useCallback is required for debounce to work
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUsername = React.useCallback(
    functionsDebounce(async (username: string) => {
      if (username.length >= 3) {
        setStatus('loading')
        const usernameDocRef = doc(firebaseDb, `usernames/${username}`)
        const usernameDocSnapshot = await getDoc(usernameDocRef)
        const usernameAlreadyExists = usernameDocSnapshot.exists()
        setStatus('success')

        if (usernameAlreadyExists) {
          setIsUsernameValid(false)
          setIsUsernameError(true)
        } else {
          setIsUsernameError(false)
          setIsUsernameValid(true)
        }
      }
    }, 500),
    []
  )

  React.useEffect(() => {
    checkUsername(username)
  }, [checkUsername, username])

  React.useEffect(() => {
    if (signUpError && signUpError.code === 'auth/email-already-in-use') {
      setIsEmailError(false)
      setIsEmailTaken(true)
      setTimeout(() => {
        setIsEmailTaken(false)
      }, 3000)
    }
  }, [signUpError])

  return (
    <>
      <Metatags
        title="Sign Up"
        description="Sign up and create a new account."
      />
      <SignSection>
        <SignTitle>Sign Up</SignTitle>
        <Form onSubmit={handleSubmit} noValidate>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Naruto Uzumaki"
              type="text"
              value={username}
              aria-invalid={isUsernameError ? 'true' : 'false'}
              onChange={handleChange}
              aria-required="true"
            />
            {isUsernameError && (
              <FormError role="alert">Username is already taken.</FormError>
            )}
            {isUsernameValid && (
              <FormIsValidText role="alert">Username is valid.</FormIsValidText>
            )}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="naruto@gmail.com"
              value={email}
              onChange={(event) => {
                handleChange(event)
                setIsEmailInvalid(!event.target.validity.valid)
              }}
              aria-invalid={isEmailError ? 'true' : 'false'}
              aria-required="true"
            />
            {isEmailError && (
              <FormError role="alert">Email is not valid.</FormError>
            )}
            {isEmailTaken && (
              <FormError role="alert">Email is already taken.</FormError>
            )}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
              aria-invalid={isPasswordError ? 'true' : 'false'}
              aria-required="true"
            />
            {isPasswordError && (
              <FormError role="alert">
                Password must be at least 6 characters.
              </FormError>
            )}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleChange}
              aria-invalid={isConfirmPasswordError ? 'true' : 'false'}
              aria-required="true"
            />
            {isConfirmPasswordError && (
              <FormError role="alert">Passwords do not match.</FormError>
            )}
          </FormGroup>
          <SwitchText>
            Already have an account?{' '}
            <Link passHref href="/sign-in">
              <SwitchLink>Sign In.</SwitchLink>
            </Link>{' '}
          </SwitchText>
          <SubmitButton
            type="submit"
            disabled={isAnyFieldEmpty || isUsernameError}
          >
            Sign Up
          </SubmitButton>
        </Form>
      </SignSection>
    </>
  )
}

export default SignUp
