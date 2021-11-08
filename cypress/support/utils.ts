import { ByRoleOptions } from '@testing-library/cypress'
import { ByRoleMatcher } from '@testing-library/dom'
import { Chef } from './generate'

type Options = ByRoleOptions & { shouldForceClick?: boolean }

export const clickByRole = (
  role: ByRoleMatcher,
  options: Options = { shouldForceClick: false }
) => cy.findByRole(role, options).click({ force: options?.shouldForceClick })

export const clickItemInMenu = (itemName: string) => {
  cy.findByRole('button', { name: 'Menu', timeout: 10000 }).should('exist')

  clickByRole('button', { name: 'Menu', shouldForceClick: true })

  cy.findByRole('menu').within(() => {
    clickByRole('menuitem', { name: itemName })
  })
}

export const waitToBeAuthorized = () =>
  cy.findByRole('button', { name: 'Menu', timeout: 8000 }).should('exist')

export const addComment = (text: string) => {
  cy.findByRole('textbox', { name: 'Comment' }).type(text)
  cy.clickByRole('button', { name: 'Post' })
  cy.findByText('You successfully added a comment to this recipe.').should(
    'exist'
  )
}

export const confirmDeletion = ({
  text,
  toastSuccessText,
}: {
  text: string
  toastSuccessText: string
}) => {
  cy.findByRole('alertdialog', { name: 'Are you sure?' }).within(() => {
    cy.findByText(text).should('exist')
    cy.clickByRole('button', { name: 'Yes' })
  })

  cy.findByText(toastSuccessText).should('exist')
}

export const signOut = () => {
  cy.clickItemInMenu('Sign Out')
  cy.findByText('Successfully signed out of your account.').should('exist')
  cy.findByRole('link', { name: 'Create Account', timeout: 8000 }).should(
    'exist'
  )
}

export const signIn = (chef: Chef) => {
  cy.visit('/sign-in')
  cy.findByLabelText('Email').type(chef.email)
  cy.findByLabelText('Password').type(chef.password)
  cy.findByRole('button', { name: 'Sign In' }).click()
  cy.findByText('Successfully signed in into your account.').should('exist')
  cy.waitToBeAuthorized()
}
