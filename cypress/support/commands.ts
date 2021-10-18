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

import {
  assertAndClickOnRecipe,
  assertPreviewMode,
  assertRecipeDetail,
  createRecipe,
  createUserAndProfile,
  assertAndEditComment,
} from './assertions'
import {
  clickByRole,
  clickItemInMenu,
  waitToBeAuthorized,
  addComment,
  confirmDeletion,
} from './utils'

declare global {
  namespace Cypress {
    interface Chainable {
      createUserAndProfile: typeof createUserAndProfile
      createRecipe: typeof createRecipe
      assertPreviewMode: typeof assertPreviewMode
      assertRecipeDetail: typeof assertRecipeDetail
      clickItemInMenu: typeof clickItemInMenu
      assertAndClickOnRecipe: typeof assertAndClickOnRecipe
      waitToBeAuthorized: typeof waitToBeAuthorized
      clickByRole: typeof clickByRole
      addComment: typeof addComment
      assertAndEditComment: typeof assertAndEditComment
      confirmDeletion: typeof confirmDeletion
    }
  }
}

Cypress.Commands.add('clickItemInMenu', clickItemInMenu)
Cypress.Commands.add('assertAndClickOnRecipe', assertAndClickOnRecipe)
Cypress.Commands.add('createUserAndProfile', createUserAndProfile)
Cypress.Commands.add('assertRecipeDetail', assertRecipeDetail)
Cypress.Commands.add('createRecipe', createRecipe)
Cypress.Commands.add('assertPreviewMode', assertPreviewMode)
Cypress.Commands.add('waitToBeAuthorized', waitToBeAuthorized)
Cypress.Commands.add('clickByRole', clickByRole)
Cypress.Commands.add('addComment', addComment)
Cypress.Commands.add('assertAndEditComment', assertAndEditComment)
Cypress.Commands.add('confirmDeletion', confirmDeletion)
