import * as React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import {
  SignSection,
  SignTitle,
  Form,
  FormGroup,
  Label,
  Input,
  SwitchLink,
  SwitchText,
  SubmitButton,
  FormError,
  FormValid,
} from "./styles";
import debounce from "lodash.debounce";
import { doc, getDoc } from "@firebase/firestore";
import { firebaseDb } from "@lib/firebase";

type FormState = {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
};

const SignUp: NextPage = () => {
  const [isUsernameError, setIsUsernameError] = React.useState(false);
  const [isUsernameValid, setIsUsernameValid] = React.useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = React.useState(false);
  const [isEmailError, setIsEmailError] = React.useState(false);
  const [isPasswordError, setIsPasswordError] = React.useState(false);
  const [isConfirmPasswordError, setIsConfirmPasswordError] =
    React.useState(false);

  const [formState, setFormState] = React.useState<FormState>({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const { username, password, confirmPassword, email } = formState;

  const isAnyFieldEmpty =
    !username.length ||
    !password.length ||
    !confirmPassword.length ||
    !email.length;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isPasswordTooShort = password.length < 6;
    if (isPasswordTooShort) {
      setIsPasswordError(true);
      return setTimeout(() => {
        setIsPasswordError(false);
      }, 3000);
    }

    const isPasswordNotMatching = password !== confirmPassword;
    if (isPasswordNotMatching) {
      setIsConfirmPasswordError(true);
      setTimeout(() => {
        setIsConfirmPasswordError(false);
      }, 3000);
    }

    if (isEmailInvalid) {
      setIsEmailError(true);
      setTimeout(() => {
        setIsEmailError(false);
      }, 3000);
    }
  };

  // useCallback is required for debounce to work
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUsername = React.useCallback(
    debounce(async (username: string) => {
      if (username.length >= 3) {
        const usernameDocRef = doc(firebaseDb, "usernames", username);
        const usernameDocSnapshot = await getDoc(usernameDocRef);

        const usernameAlreadyExists = usernameDocSnapshot.exists();

        if (usernameAlreadyExists) {
          setIsUsernameValid(false);
          setIsUsernameError(true);
        } else {
          setIsUsernameError(false);
          setIsUsernameValid(true);
        }
      }
    }, 500),
    []
  );

  React.useEffect(() => {
    checkUsername(username);
  }, [checkUsername, username]);

  return (
    <SignSection>
      <SignTitle>Sign Up</SignTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            placeholder="Naruto_Uzumaki..."
            type="text"
            value={username}
            onChange={(event) => handleChange(event)}
            aria-invalid={isUsernameError ? "true" : "false"}
            aria-required="true"
          />
          {isUsernameError && (
            <FormError role="alert">Username is already taken.</FormError>
          )}
          {isUsernameValid && (
            <FormValid role="alert">Username is valid.</FormValid>
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
              handleChange(event);
              setIsEmailInvalid(!event.target.validity.valid);
            }}
            aria-required="true"
          />
          {isEmailError && (
            <FormError role="alert">Email is not valid.</FormError>
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Secret Password..."
            value={password}
            onChange={(event) => handleChange(event)}
            aria-invalid={isPasswordError ? "true" : "false"}
            aria-required="true"
          />
          {isPasswordError && (
            <FormError>Password must be at least 6 characters.</FormError>
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="Secret Password..."
            value={confirmPassword}
            onChange={(event) => handleChange(event)}
            aria-invalid={isConfirmPasswordError ? "true" : "false"}
            aria-required="true"
          />
          {isConfirmPasswordError && (
            <FormError>Passwords do not match.</FormError>
          )}
        </FormGroup>
        <SwitchText>
          Already have an account?{" "}
          <Link passHref href="/sign-in">
            <SwitchLink>Sign In.</SwitchLink>
          </Link>{" "}
        </SwitchText>
        <SubmitButton
          type="submit"
          disabled={isAnyFieldEmpty || isUsernameError}
        >
          Sign Up
        </SubmitButton>
      </Form>
    </SignSection>
  );
};

export default SignUp;
