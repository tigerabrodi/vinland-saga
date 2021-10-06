import * as React from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useLoadingStore } from '@lib/store'
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

const SignIn: NextPage = () => {
  const [isError, setIsError] = React.useState(false)

  const {
    handleChange,
    formState: { password, email },
  } = useFormState({
    password: '',
    email: '',
  })

  const { setStatus } = useLoadingStore()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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
            onChange={(event) => handleChange(event)}
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
            onChange={(event) => handleChange(event)}
            aria-required="true"
          />
          {isError && (
            <FormError role="alert">Password or email is invalid.</FormError>
          )}
        </FormGroup>
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
