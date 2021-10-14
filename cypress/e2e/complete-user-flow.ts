import { buildUser, buildRecipe, buildComments } from '../support/generate'

beforeEach(() => {
  indexedDB.deleteDatabase('firebaseLocalStorageDb')
  cy.visit('/')
})

it('Complete users flow', () => {
  const firstUser = buildUser()
  const firstUserRecipe = buildRecipe()

  const secondUser = buildUser()
  const secondUserRecipe = buildRecipe()
  const secondUserRecipe2 = buildRecipe()
  const secondUserComments = buildComments()

  const thirdUser = buildUser()
  const thirdUserRecipe = buildRecipe()

  cy.createUserAndProfile(firstUser)
  cy.findByRole('button', { name: 'New Recipe' }).click()
  cy.createRecipe(firstUserRecipe)
  cy.assertPreviewMode(firstUserRecipe, firstUser)

  // Submit recipe (first user)
  cy.findByRole('button', { name: 'Submit' }).click()
  cy.findByText(
    `Successfully updated your recipe ${firstUserRecipe.title}.`
  ).should('exist')

  // Recipe Detail Page
  cy.assertRecipeDetail(firstUserRecipe, firstUser)

  // Currently no comments
  cy.findByRole('heading', { name: 'Comments' }).should('exist')
  cy.findByText('This recipe currently has no comments.')

  // Go to Profile via Menu
  cy.clickItemInMenu('Profile')
  cy.findByRole('heading', { name: firstUser.fullname }).should('exist')

  // Sign Out (first user)
  cy.clickItemInMenu('Sign Out')
  cy.findByText('Successfully signed out of your account.').should('exist')
  cy.findByRole('link', { name: 'Create Account', timeout: 8000 }).should(
    'exist'
  )

  // Create second user
  cy.createUserAndProfile(secondUser)

  // Go to recipes feed
  cy.findByRole('link', { name: 'Home' }).click()

  // Click on first user's recipe
  cy.findByRole('heading', { name: 'Recipes' }).should('exist')
  cy.findByRole('list').within(() => {
    cy.assertAndClickOnRecipe(firstUserRecipe, firstUser)
  })

  // Clap
  cy.findByRole('button', { name: 'Recipe 0 claps' }).click()
  cy.findByRole('button', { name: 'Recipe 1 claps' }).should('exist')

  // Go to recipes feed
  cy.findByRole('link', { name: 'Home' }).click()

  // Ensure clap count
  cy.findByRole('listitem', {
    name: `Read the recipe ${firstUserRecipe.title}`,
  }).within(() => {
    cy.findByLabelText('1 claps').should('exist')

    // Go back to recipe detail
    cy.findByRole('link', { name: firstUserRecipe.title }).click()
  })

  // Go to comments
  cy.findByRole('link', { name: '0 comments' }).click()

  // Write a comment
  cy.findByRole('textbox', { name: 'Comment' }).type(
    secondUserComments.firstComment
  )
  cy.findByRole('button', { name: 'Post' }).click()
  cy.findByText('You successfully added a comment to this recipe.').should(
    'exist'
  )

  // Assert comments link length
  cy.findByRole('link', { name: '1 comments' }).click()

  // Assert comment
  cy.findByRole('listitem').within(() => {
    cy.findByRole('link', { name: secondUser.fullname }).should('exist')
    cy.findByRole('img', { name: secondUser.fullname }).should('exist')
    cy.findByText(secondUserComments.firstComment).should('exist')
    cy.findByRole('button', { name: 'Comment 0 claps' }).should('exist')
    cy.findByText(/^On 2021-10/).should('exist')

    // Edit comment
    cy.findByRole('button', { name: 'Edit Comment' }).click()
    cy.findByRole('textbox', { name: 'Edit Comment' })
      .should('have.value', secondUserComments.firstComment)
      .clear()
      .type(secondUserComments.secondComment)
    cy.findByRole('button', { name: 'Save' }).click()
  })

  // Assert edited comment
  cy.findByText('Successfully edited your comment.').should('exist')
  cy.findByText(secondUserComments.secondComment).should('exist')

  // Delete Comment
  cy.findByRole('button', { name: 'Delete Comment' }).click()
  cy.findByRole('alertdialog', { name: 'Are you sure?' }).within(() => {
    cy.findByText('Do you really want to delete your comment?').should('exist')
    cy.findByRole('button', { name: 'Yes' }).click()
  })

  cy.findByText('Successfully deleted your comment.').should('exist')

  // No comments should exist
  cy.findByRole('listitem').should('not.exist')

  // Write two comments
  // Create two recipes

  // Sign Out (second user)

  // Login (first user)
  // See recipe on first user's profile
  // Go to users page
  // Sort by both claps and recipes of the users
  // Click on the second user and see both its recipes on the profile page
  // Go to home and assert the recipe item comments length of your own recipe
  // Go to your own profile and click on your recipe, also assert it has two comments and a clap, clap and unclap one of the comments

  // Sign out (first user)

  // Create third user
  // Go to the first user's recipe and clap on one of the comments, and unclap it, assert it too
  // Sign out (Third User)

  // Login (second user) and go to users page
  // Sort by both claps and recipes, third user should always come last
  // Go to third user's profile
  // Assert text that the user has no recipes
  // Go to the feed page and be able to sort by claps and newest date
  // Go to your profile and click on the first recipe, then delete it and assert you get redirected to your profile
  // Then assert the recipe is no longer there

  // Assert authorization of pages (both as second user and logged out user)

  // Sign Out

  // Sign in Third User

  // Create over 10 recipes, assert that 10 recipes max are being shown and assert Load More button
})
