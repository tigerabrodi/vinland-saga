import * as React from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useFormState } from '@hooks/useFormState'
import {
  Form,
  FormGroup,
  Label,
  SignSection,
  SignTitle,
  SubmitButton,
  SwitchLink,
  SwitchText,
  FormError,
  Input,
} from '@styles/formStyles'
import { useSignInWithEmailAndPassword } from '@hooks/auth/useSignInWithEmailAndPassword'

const SignIn: NextPage = () => {
  const {
    handleChange,
    formState: { password, email },
  } = useFormState({
    password: '',
    email: '',
  })

  const { isSignInError, signInWithEmailAndPassword } =
    useSignInWithEmailAndPassword()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    signInWithEmailAndPassword(email, password)
  }

  return (
    <SignSection isLoginMode>
      <SignTitle>Sign In</SignTitle>
      <Form onSubmit={handleSubmit} noValidate>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="naruto@gmail.com"
            value={email}
            onChange={handleChange}
            aria-required="true"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password" isLoginMode>
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Secret Password..."
            value={password}
            onChange={handleChange}
            aria-required="true"
          />
        </FormGroup>
        {isSignInError && (
          <FormError role="alert" isLoginMode>
            Password or email is invalid.
          </FormError>
        )}
        <SwitchText>
          Do not have an account yet?{' '}
          <Link passHref href="/sign-up">
            <SwitchLink>Sign Up.</SwitchLink>
          </Link>{' '}
        </SwitchText>
        <SubmitButton
          type="submit"
          disabled={!email.length || !password.length}
        >
          Sign In
        </SubmitButton>
      </Form>
    </SignSection>
  )
}

export default SignIn
