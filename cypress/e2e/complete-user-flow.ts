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

  /*   const thirdUser = buildUser()
  const thirdUserRecipe = buildRecipe() */

  cy.createUserAndProfile(firstUser)
  cy.clickByRole('button', { name: 'New Recipe' })
  cy.createRecipe(firstUserRecipe)
  cy.assertPreviewMode(firstUserRecipe, firstUser)

  // Submit recipe (first user)
  cy.clickByRole('button', { name: 'Submit' })
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
  cy.signOut()

  // Create second user
  cy.createUserAndProfile(secondUser)

  // Go to recipes feed
  cy.clickByRole('link', { name: 'Home' })

  // Click on first user's recipe
  cy.findByRole('heading', { name: 'Recipes' }).should('exist')
  cy.findByRole('list').within(() => {
    cy.assertAndClickOnRecipe(firstUserRecipe, firstUser)
  })

  // Clap
  cy.clickByRole('button', { name: 'Recipe 0 claps' })
  cy.findByRole('button', { name: 'Recipe 1 claps' }).should('exist')

  // Go to recipes feed
  cy.clickByRole('link', { name: 'Home' })

  // Ensure clap count
  cy.findByRole('listitem', {
    name: firstUserRecipe.title,
  }).within(() => {
    cy.findByLabelText('1 claps').should('exist')

    // Go back to recipe detail
    cy.clickByRole('link', { name: firstUserRecipe.title })
  })

  // Go to comments
  cy.clickByRole('link', { name: '0 comments' })

  // Write a comment
  cy.addComment(secondUserComments.firstComment)

  // Assert comments link length
  cy.clickByRole('link', { name: '1 comments' })

  // Assert and edit comment
  cy.assertAndEditComment({
    firstComment: secondUserComments.firstComment,
    secondComment: secondUserComments.secondComment,
    fullname: secondUser.fullname,
  })

  // Delete Comment
  cy.clickByRole('button', { name: 'Delete Comment' })

  cy.confirmDeletion({
    text: 'Do you really want to delete your comment?',
    toastSuccessText: 'Successfully deleted your comment.',
  })

  // No comments should exist
  cy.findByRole('listitem').should('not.exist')

  // Write two comments
  cy.addComment(secondUserComments.firstComment)
  cy.addComment(secondUserComments.secondComment)

  // Create two recipes
  cy.clickItemInMenu('New Recipe')
  cy.createRecipe(secondUserRecipe)
  cy.clickByRole('button', { name: 'Submit' })

  cy.clickItemInMenu('New Recipe')
  cy.createRecipe(secondUserRecipe2)
  cy.clickByRole('button', { name: 'Submit' })

  // Sign Out (second user)
  cy.signOut()

  // Login (first user)
  cy.signIn(firstUser)

  // See recipe on first user's profile
  cy.clickItemInMenu('Profile')
  cy.findByRole('heading', { name: firstUser.fullname, level: 1 }).should(
    'exist'
  )
  cy.findByRole('heading', { name: firstUserRecipe.title, level: 3 }).should(
    'exist'
  )

  // Go to users page
  cy.clickByRole('link', { name: 'users' })

  // Click on the second user and see both its recipes on the profile page
  cy.assertAndClickOnSecondUser(secondUser)

  // Go to home and assert the recipe item comments length of your own recipe
  // Go to your own profile and click on your recipe, also assert it has two comments and a clap, clap and unclap one of the comments

  // Sign out (first user)

  // Create third user
  // Go to the first user's recipe and clap on one of the comments, and unclap it, assert it too
  // Sign out (Third User)

  // Login (second user) and go to users page
  // Go to third user's profile
  // Assert text that the user has no recipes
  // Go to your profile and click on the first recipe, then delete it and assert you get redirected to your profile
  // Then assert the recipe is no longer there

  // Assert authorization of pages (both as second user and logged out user)

  // Sign Out

  // Sign in Third User

  // Create over 10 recipes, assert that 10 recipes max are being shown and assert Load More button
})
