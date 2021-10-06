import { buildUser } from '../support/generate'

beforeEach(() => {
  indexedDB.deleteDatabase('firebaseLocalStorageDb')
  cy.visit('/sign-in')
})

it('Username validation', () => {
  const user = buildUser()

  cy.findByText('Password or email is invalid.').should('not.exist')

  cy.findByLabelText('Email').type(user.email)

  cy.findByLabelText('Password').type('Blah')

  cy.findByRole('button', { name: 'Sign In' }).click()

  cy.findByText('Password or email is invalid.').should('exist')
})
