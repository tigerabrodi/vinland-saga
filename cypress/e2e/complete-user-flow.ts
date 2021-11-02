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

  // Detail page
  cy.findByRole('heading', {
    name: firstUserRecipe.title,
    level: 1,
  }).should('exist')

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
    cy.clickByRole('link', { name: `Read more about ${firstUserRecipe.title}` })
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

  // Go to profile
  cy.clickItemInMenu('Profile')

  // Assert the recipe exist
  cy.findByRole('heading', { name: firstUser.fullname, level: 1 }).should(
    'exist'
  )
  cy.findByRole('heading', {
    name: `Read more about ${firstUserRecipe.title}`,
    level: 3,
  }).should('exist')

  // Go to users page
  cy.clickByRole('link', { name: 'Users' })

  // Click on the second user
  cy.assertAndClickOnSecondUser(secondUser)

  // See two recipes
  cy.findByRole('heading', { name: 'Recipes', level: 2 }).should('exist')
  cy.findByRole('heading', {
    name: `Read more about ${secondUserRecipe.title}`,
    level: 3,
  }).should('exist')
  cy.findByRole('heading', {
    name: `Read more about ${secondUserRecipe2.title}`,
    level: 3,
  }).should('exist')

  // Go to home
  cy.clickByRole('link', { name: 'Home' })

  // Assert first user recipe comments
  cy.findByRole('listitem', { name: firstUserRecipe.title }).within(() => {
    cy.findByLabelText('2 comments').should('exist')
  })

  // Go to profile
  cy.clickItemInMenu('Profile')

  // Click on recipe
  cy.clickByRole('link', { name: `Read more about ${firstUserRecipe.title}` })

  // Assert two comments do exist
  cy.findByText(secondUserComments.firstComment).should('exist')
  cy.findByText(secondUserComments.secondComment).should('exist')

  // Clap and Unclap first comment
  cy.findAllByRole('listitem')
    .first()
    .within(() => {
      cy.clickByRole('button', { name: 'Comment 0 claps' })
      cy.clickByRole('button', { name: 'Comment 1 claps' })
      cy.findByRole('button', { name: 'Comment 0 claps' }).should('exist')
    })

  // Sign out (first user)
  cy.signOut()

  // Login (second user)
  cy.signIn(secondUser)

  // Go to Profile
  cy.clickItemInMenu('Profile')

  // Click on first recipe
  cy.clickByRole('link', { name: `Read more about ${secondUserRecipe.title}` })

  // Delete recipe
  cy.clickByRole('button', { name: 'Delete Recipe' })
  cy.confirmDeletion({
    text: 'Do you really want to delete your recipe?',
    toastSuccessText: 'Successfully deleted your recipe.',
  })

  // Back to profile
  cy.findByRole('heading', { name: secondUser.fullname, level: 1 }).should(
    'exist'
  )

  // Recipe shouldn't exist
  cy.findByRole('link', {
    name: `Read more about ${secondUserRecipe.title}`,
  }).should('not.exist')

  // Sign out (second user)
  cy.signOut()

  // Authorization: Try editing first user profile
  cy.visit(`/${firstUser.username}/edit`)

  cy.findByText('You are not authorized to edit this profile.').should('exist')
  cy.location('pathname').should('eq', '/')

  // Authorization: Try editing first user's recipe

  // TODO Load More Button
  // TODO Sorting functionalities
})
