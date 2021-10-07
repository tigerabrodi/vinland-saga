// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { User, Recipe } from './generate'

declare global {
  namespace Cypress {
    interface Chainable {
      createUserAndProfile: typeof createUserAndProfile
      createRecipe: typeof createRecipe
      assertPreviewMode: typeof assertPreviewMode
      assertRecipeDetail: typeof assertRecipeDetail
      clickItemInMenu: typeof clickItemInMenu
    }
  }
}

const createUserAndProfile = (user: User) => {
  cy.findByRole('link', { name: 'Create Account' }).click()

  // Create Account
  cy.findByLabelText('Username').type(user.username)
  cy.findByLabelText('Email').type(user.email)
  cy.findByLabelText('Password').type(user.password)
  cy.findByLabelText('Confirm Password').type(user.password)
  cy.findByRole('button', { name: 'Sign Up' }).click()

  // Create Profile
  cy.findByText('You successfully created your account.').should('exist')
  cy.findByRole('heading', { name: 'Editing Profile', timeout: 8000 }).should(
    'exist'
  )
  cy.findByRole('button', { name: 'Save' }).should('have.attr', 'disabled')

  cy.findByRole('img', { name: 'default' }).should('exist')
  cy.findByLabelText('Avatar Upload').attachFile('tiger-avatar.png')
  cy.findByRole('img', { name: 'avatar' }).should('exist')
  cy.findByText('Successfully uploaded your avatar.').should('exist')

  cy.findByLabelText('Full Name *').type(user.fullname)
  cy.findByLabelText('Age *').type(`${user.age}`)
  cy.findByLabelText('Work *').type(`Chef at ${user.work}`)
  cy.findByLabelText('Location *').type(`${user.location}`)
  cy.findByLabelText('Biography').type(user.bio)

  cy.findByRole('button', { name: 'Save' }).click()
  cy.findByText('Successfully updated your profile.').should('exist')

  // User Profile
  cy.findByRole('heading', { name: user.fullname }).should('exist')
  cy.findByText(`@${user.username}`).should('exist')
  cy.findByText(`Age ${user.age}`).should('exist')
  cy.findByText(`Located in ${user.location}`).should('exist')
  cy.findByText(`Chef at ${user.work}`).should('exist')
  cy.findByText(user.bio).should('exist')
  cy.findByRole('link', { name: 'Edit Your Profile' }).should('exist')
  cy.findByRole('img', { name: user.fullname }).should('exist')

  cy.findByRole('heading', { name: 'Recipes' }).should('exist')
  cy.findByText('You currently have written no recipes.')
}

const createRecipe = (recipe: Recipe) => {
  cy.findByRole('dialog', { name: 'Create Recipe' }).within(() => {
    cy.findByRole('heading', { name: 'Create Recipe' }).should('exist')
    cy.findByLabelText('Title').type(recipe.title)
    cy.findByRole('button', { name: 'Create' }).click()
  })

  cy.findByText(`You successfully created the recipe ${recipe.title}.`).should(
    'exist'
  )

  // Edit Recipe
  cy.findByRole('heading', { name: 'Edit Recipe' }).should('exist')

  cy.findByLabelText('Title').should('have.value', recipe.title)
  cy.findByRole('img', { name: 'Placeholder' }).should('exist')

  cy.findByLabelText('Body').type(recipe.body)
  cy.findByRole('link', { name: 'Markdown.' }).should('exist')

  cy.findByLabelText('Upload Recipe Image').attachFile('recipe-image.jpg')

  cy.findByRole('img', { name: recipe.title }).should('exist')

  cy.findByText('Successfully uploaded your recipe image.').should('exist')
}

const assertPreviewMode = (recipe: Recipe, user: User) => {
  // Turn on Preview Mode
  cy.findByRole('button', { name: 'Preview' }).click()
  cy.findByRole('heading', { name: 'Edit Recipe' }).should('not.exist')

  // Assert preview page
  cy.assertRecipeDetail(recipe, user)

  // Turn off preview mode
  cy.findByRole('button', { name: 'Preview' }).click()
  cy.findByRole('heading', { name: 'Edit Recipe' }).should('exist')
}

const assertRecipeDetail = (recipe: Recipe, user: User) => {
  cy.findByRole('heading', { name: recipe.title }).should('exist')
  cy.findByText(recipe.body).should('exist')
  cy.findByRole('link', { name: user.fullname }).should('exist')
  cy.findByRole('img', { name: recipe.title }).should('exist')
  cy.findByRole('button', { name: 'Recipe 0 claps' }).should('exist')
  cy.findByRole('link', { name: '0 comments' }).should('exist')
  cy.findByRole('link', { name: 'Edit Recipe' }).should('exist')
  cy.findByRole('button', { name: 'Delete Recipe' }).should('exist')
}

const clickItemInMenu = (itemName: string) => {
  cy.findByRole('button', { name: 'Menu', timeout: 10000 }).should('exist')

  cy.findByRole('button', { name: 'Menu' }).click({
    force: true,
  })

  cy.findByRole('menu').within(() => {
    cy.findByRole('menuitem', { name: itemName }).click()
  })
}

Cypress.Commands.add('clickItemInMenu', clickItemInMenu)
Cypress.Commands.add('createUserAndProfile', createUserAndProfile)
Cypress.Commands.add('assertRecipeDetail', assertRecipeDetail)
Cypress.Commands.add('createRecipe', createRecipe)
Cypress.Commands.add('assertPreviewMode', assertPreviewMode)
