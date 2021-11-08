import { Recipe, Chef } from './generate'

export const createUserAndProfile = (chef: Chef) => {
  cy.clickByRole('link', { name: 'Create Account' })

  // Create Account
  cy.findByLabelText('Username').type(chef.username)
  cy.findByLabelText('Email').type(chef.email)
  cy.findByLabelText('Password').type(chef.password)
  cy.findByLabelText('Confirm Password').type(chef.password)
  cy.clickByRole('button', { name: 'Sign Up' })

  // Create Profile
  cy.findByText('You successfully created your account.').should('exist')
  cy.waitToBeAuthorized()
  cy.findByRole('heading', { name: 'Editing Profile', timeout: 16000 }).should(
    'exist'
  )
  cy.findByRole('button', { name: 'Save' }).should('have.attr', 'disabled')

  cy.findByRole('img', { name: 'default' }).should('exist')
  cy.findByLabelText('Avatar Upload').attachFile('tiger-avatar.png')
  cy.findByRole('img', { name: 'avatar' }).should('exist')
  cy.findByText('Successfully uploaded your avatar.').should('exist')

  cy.findByLabelText('Full Name *').type(chef.fullname)
  cy.findByLabelText('Age *').type(`${chef.age}`)
  cy.findByLabelText('Work *').type(`Chef at ${chef.work}`)
  cy.findByLabelText('Location *').type(`${chef.location}`)
  cy.findByLabelText('Biography *').type(chef.bio)

  cy.clickByRole('button', { name: 'Save' })
  cy.findByText('Successfully updated your profile.').should('exist')

  // User Profile
  cy.findByRole('heading', { name: chef.fullname, timeout: 16000 }).should(
    'exist'
  )
  cy.findByText(`@${chef.username}`).should('exist')
  cy.findByText(`Age ${chef.age}`).should('exist')
  cy.findByText(`Located in ${chef.location}`).should('exist')
  cy.findByText(`Chef at ${chef.work}`).should('exist')
  cy.findByText(chef.bio).should('exist')
  cy.findByRole('link', { name: 'Edit Your Profile' }).should('exist')
  cy.findByRole('img', { name: chef.fullname }).should('exist')

  cy.findByRole('heading', { name: 'Recipes' }).should('exist')
  cy.findByText('You currently have written no recipes.')
}

export const createRecipe = (recipe: Recipe) => {
  cy.findByRole('dialog', { name: 'Create Recipe' }).within(() => {
    cy.findByRole('heading', { name: 'Create Recipe' }).should('exist')
    cy.findByLabelText('Title').type(recipe.title)
    cy.clickByRole('button', { name: 'Create' })
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
