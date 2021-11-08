import { buildUser, buildRecipe, buildComments } from '../support/generate'

beforeEach(() => {
  indexedDB.deleteDatabase('firebaseLocalStorageDb')
  cy.visit('/')
})

it('Complete flow', () => {
  const firstChef = buildUser()
  const firstChefRecipe = buildRecipe()
  const firstChefRecipe2 = buildRecipe()

  const secondChef = buildUser()
  const secondChefRecipe = buildRecipe()
  const secondChefRecipe2 = buildRecipe()
  const secondChefComments = buildComments()

  cy.createUserAndProfile(firstChef)
  cy.clickByRole('button', { name: 'New Recipe' })
  cy.createRecipe(firstChefRecipe)
  cy.assertPreviewMode(firstChefRecipe, firstChef)

  // Submit recipe (first user)
  cy.clickByRole('button', { name: 'Submit' })
  cy.findByText(
    `Successfully updated your recipe ${firstChefRecipe.title}.`
  ).should('exist')

  // Recipe Detail Page
  cy.assertRecipeDetail(firstChefRecipe, firstChef)

  // Currently no comments
  cy.findByRole('heading', { name: 'Comments' }).should('exist')
  cy.findByText('This recipe currently has no comments.')

  // Go to Profile via Menu
  cy.clickItemInMenu('Profile')
  cy.findByRole('heading', { name: firstChef.fullname }).should('exist')

  // Sign Out (first user)
  cy.signOut()

  // Create second user
  cy.createUserAndProfile(secondChef)

  // Go to recipes feed
  cy.clickByRole('link', { name: 'Home' })

  // Click on first user's recipe
  cy.findByRole('heading', { name: 'Recipes' }).should('exist')
  cy.findByRole('list').within(() => {
    cy.assertAndClickOnRecipe(firstChefRecipe, firstChef)
  })

  // Detail page
  cy.findByRole('heading', {
    name: firstChefRecipe.title,
    level: 1,
  }).should('exist')

  // Clap
  cy.clickByRole('button', { name: 'Recipe 0 claps' })
  cy.findByRole('button', { name: 'Recipe 1 claps' }).should('exist')

  // Go to recipes feed
  cy.clickByRole('link', { name: 'Home' })

  // Ensure clap count
  cy.findByRole('listitem', {
    name: firstChefRecipe.title,
  }).within(() => {
    cy.findByLabelText('1 claps').should('exist')

    // Go back to recipe detail
    cy.clickByRole('link', { name: `Read more about ${firstChefRecipe.title}` })
  })

  // Go to comments
  cy.clickByRole('link', { name: '0 comments' })

  // Write a comment
  cy.addComment(secondChefComments.firstComment)

  // Assert comments link length
  cy.clickByRole('link', { name: '1 comments' })

  // Assert and edit comment
  cy.assertAndEditComment({
    firstComment: secondChefComments.firstComment,
    secondComment: secondChefComments.secondComment,
    fullname: secondChef.fullname,
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
  cy.addComment(secondChefComments.firstComment)
  cy.addComment(secondChefComments.secondComment)

  // Create two recipes
  cy.clickItemInMenu('New Recipe')
  cy.createRecipe(secondChefRecipe)
  cy.clickByRole('button', { name: 'Submit' })

  cy.clickItemInMenu('New Recipe')
  cy.createRecipe(secondChefRecipe2)
  cy.clickByRole('button', { name: 'Submit' })

  // Sign Out (second user)
  cy.signOut()

  // Login (first user)
  cy.signIn(firstChef)

  // Go to profile
  cy.clickItemInMenu('Profile')

  // Assert the recipe exist
  cy.findByRole('heading', { name: firstChef.fullname, level: 1 }).should(
    'exist'
  )
  cy.findByRole('heading', {
    name: `Read more about ${firstChefRecipe.title}`,
    level: 3,
  }).should('exist')

  // Go to chefs page
  cy.clickByRole('link', { name: 'Chefs' })

  // Click on the second user
  cy.assertAndClickOnSecondChef(secondChef)

  // See two recipes
  cy.findByRole('heading', { name: 'Recipes', level: 2 }).should('exist')
  cy.findByRole('heading', {
    name: `Read more about ${secondChefRecipe.title}`,
    level: 3,
  }).should('exist')
  cy.findByRole('heading', {
    name: `Read more about ${secondChefRecipe2.title}`,
    level: 3,
  }).should('exist')

  // Go to home
  cy.clickByRole('link', { name: 'Home' })

  // Assert first user recipe comments
  cy.findByRole('listitem', { name: firstChefRecipe.title }).within(() => {
    cy.findByLabelText('2 comments').should('exist')
  })

  // Go to profile
  cy.clickItemInMenu('Profile')

  // Click on recipe
  cy.clickByRole('link', { name: `Read more about ${firstChefRecipe.title}` })

  // Assert two comments do exist
  cy.findByText(secondChefComments.firstComment).should('exist')
  cy.findByText(secondChefComments.secondComment).should('exist')

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
  cy.signIn(secondChef)

  // Go to Profile
  cy.clickItemInMenu('Profile')

  // Click on first recipe
  cy.clickByRole('link', { name: `Read more about ${secondChefRecipe.title}` })

  // Delete recipe
  cy.clickByRole('button', { name: 'Delete Recipe' })
  cy.confirmDeletion({
    text: 'Do you really want to delete your recipe?',
    toastSuccessText: 'Successfully deleted your recipe.',
  })

  // Back to profile
  cy.findByRole('heading', { name: secondChef.fullname, level: 1 }).should(
    'exist'
  )

  // Recipe shouldn't exist
  cy.findByRole('link', {
    name: `Read more about ${secondChefRecipe.title}`,
  }).should('not.exist')

  // Sign out (second user)
  cy.signOut()

  // Authorization: Try editing first user profile
  cy.visit(`/${firstChef.username}/edit`)

  cy.findByText('You are not authorized to edit this profile.').should('exist')
  cy.location('pathname').should('eq', '/')

  // Authorization: Try clapping a recipe
  cy.clickByRole('link', { name: `Read more about ${firstChefRecipe.title}` })
  cy.findByRole('button', { name: 'Recipe 1 claps' }).click()
  cy.findByText('You have to be logged in to clap a recipe.').should('exist')
  cy.location('pathname').should('eq', '/sign-in')

  // Sign In (First user)
  cy.signIn(firstChef)

  // Clap first user recipe
  cy.clickByRole('link', { name: `Read more about ${firstChefRecipe.title}` })
  cy.clickByRole('button', { name: 'Recipe 1 claps' })
  cy.findByRole('button', { name: 'Recipe 2 claps' }).should('exist')
  cy.visit('/')

  // Default sorting by claps, first user's recipe has two claps, hence it should be the first one in the list.
  cy.findAllByRole('listitem')
    .first()
    .within(() => {
      cy.findByRole('link', {
        name: `Read more about ${firstChefRecipe.title}`,
      }).should('exist')
      cy.findByLabelText('2 claps').should('exist')
    })

  // Sort by newest recipes by creating a new recipe and ensuring it is the first one.
  cy.clickItemInMenu('New Recipe')
  cy.createRecipe(firstChefRecipe2)
  cy.visit('/')
  cy.findByLabelText('Sort by Newest').click()

  cy.wait(1000)

  cy.findAllByRole('listitem')
    .first()
    .within(() => {
      cy.findByRole('link', {
        name: `Read more about ${firstChefRecipe2.title}`,
      }).should('exist')
    })

  // Chefs Sorting
  cy.clickByRole('link', { name: 'Chefs' })
  cy.wait(1000)

  // First user should be first since default sorting is by claps.
  cy.findAllByRole('listitem')
    .first()
    .within(() => {
      cy.findByRole('heading', { name: firstChef.fullname }).should('exist')
    })

  // Sign out (first user)
  cy.signOut()

  // Sign In (second user)
  cy.signIn(secondChef)

  // Create 3 recipes
  cy.clickItemInMenu('New Recipe')
  cy.createRecipe(secondChefRecipe)
  cy.clickByRole('button', { name: 'Submit' })

  cy.clickItemInMenu('New Recipe')
  cy.createRecipe(secondChefRecipe)
  cy.clickByRole('button', { name: 'Submit' })

  cy.clickItemInMenu('New Recipe')
  cy.createRecipe(secondChefRecipe)
  cy.clickByRole('button', { name: 'Submit' })

  cy.clickByRole('link', { name: 'Chefs' })
  cy.wait(1000)

  // Default sorting is by claps hence the first user should be first and not the second user.
  cy.findAllByRole('listitem')
    .first()
    .within(() => {
      cy.findByRole('heading', { name: firstChef.fullname }).should('exist')
    })

  // Sort by recipes
  cy.findByLabelText('Sort by Recipes').click()
  cy.wait(1000)

  // Second user should now be first since it has more recipes than the first user.
  cy.findAllByRole('listitem')
    .first()
    .within(() => {
      cy.findByRole('heading', { name: secondChef.fullname }).should('exist')
    })
})
