import { buildUser, buildRecipe } from '../support/generate'

beforeEach(() => {
  indexedDB.deleteDatabase('firebaseLocalStorageDb')
  cy.visit('/')
})

it('Complete users flow', () => {
  const firstUser = buildUser()
  const firstUserRecipe = buildRecipe()

  cy.createUserAndProfile(firstUser)
  cy.findByRole('button', { name: 'New Recipe' }).click()
  cy.createRecipe(firstUserRecipe)
  cy.assertPreviewMode(firstUserRecipe, firstUser)

  // Submit recipe (first user)
  cy.findByRole('button', { name: 'Submit' }).click()
  cy.findByText(
    `Successfully updated your recipe ${firstUserRecipe.title}.`
  ).should('exist')

  // Recipe Detail Page (first user)
  cy.assertRecipeDetail(firstUserRecipe, firstUser)

  // Currently no comments
  cy.findByRole('heading', { name: 'Comments' }).should('exist')
  cy.findByText('This recipe currently has no comments.')

  // Go to Profile via Menu
  cy.clickItemInMenu('Profile')
  cy.findByRole('heading', { name: firstUser.fullname }).should('exist')

  /*
  // Clap and unclap the recipe
  cy.findByRole('button', { name: 'Recipe 0 claps' }).click()
  cy.findByRole('button', { name: 'Recipe 1 claps' }).click()
  cy.findByRole('button', { name: 'Recipe 0 claps' }).should('exist')

     // Write a comment to the recipe
  cy.findByLabelText('Comment').type(firstUserRecipe.comment)
  cy.findByRole('button', { name: 'Post' }).click()
  cy.findByText('Successfully added a comment to this recipe.').should('exist')
  cy.findByText('This recipe currently has no comments.').should('not.exist')
  cy.findByRole('link', { name: '1 comments' }).should('exist')

  // Find Comment
  cy.findByText(firstUserRecipe.comment).should('exist')

  // Clap and unclap the comment
  cy.findByRole('button', { name: 'Comment 0 claps' }).click()
  cy.findByRole('button', { name: 'Comment 1 claps' }).click()
  cy.findByRole('button', { name: 'Comment 0 claps' }).should('exist')

  // Edit Comment
  cy.findByRole('button', { name: 'Edit Comment' }).click()
  cy.findByRole('textbox', { name: 'Edit Comment' }).clear()
  cy.findByRole('textbox', { name: 'Edit Comment' }).type(
    firstUserRecipe.editedComment
  )
  cy.findByRole('button', { name: 'Save' }).click()
  cy.findByText(firstUserRecipe.editedComment).should('exist')
  cy.findByText('Successfully edited your comment.').should('exist')

  // Delete Comment
  cy.findByRole('button', { name: 'Delete Comment' }).click() */
})
