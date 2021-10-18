import { Recipe, User } from './generate'

export const createUserAndProfile = (user: User) => {
  cy.clickByRole('link', { name: 'Create Account' })

  // Create Account
  cy.findByLabelText('Username').type(user.username)
  cy.findByLabelText('Email').type(user.email)
  cy.findByLabelText('Password').type(user.password)
  cy.findByLabelText('Confirm Password').type(user.password)
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

  cy.findByLabelText('Full Name *').type(user.fullname)
  cy.findByLabelText('Age *').type(`${user.age}`)
  cy.findByLabelText('Work *').type(`Chef at ${user.work}`)
  cy.findByLabelText('Location *').type(`${user.location}`)
  cy.findByLabelText('Biography').type(user.bio)

  cy.clickByRole('button', { name: 'Save' })
  cy.findByText('Successfully updated your profile.').should('exist')

  // User Profile
  cy.findByRole('heading', { name: user.fullname, timeout: 16000 }).should(
    'exist'
  )
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

export const assertPreviewMode = (recipe: Recipe, user: User) => {
  // Turn on Preview Mode
  cy.clickByRole('button', { name: 'Preview' })
  cy.findByRole('heading', { name: 'Edit Recipe' }).should('not.exist')

  // Assert preview page
  cy.assertRecipeDetail(recipe, user)

  // Turn off preview mode
  cy.clickByRole('button', { name: 'Preview', shouldForceClick: true })
  cy.findByRole('heading', { name: 'Edit Recipe', timeout: 8000 }).should(
    'exist'
  )
}

export const assertRecipeDetail = (recipe: Recipe, user: User) => {
  cy.findByRole('heading', { name: recipe.title, timeout: 16000 }).should(
    'exist'
  )
  cy.findByText(recipe.body).should('exist')
  cy.findByRole('link', { name: user.fullname }).should('exist')
  cy.findByRole('img', { name: recipe.title }).should('exist')
  cy.findByText(/^Posted on 2021-10/i).should('exist')
  cy.findByRole('button', { name: 'Recipe 0 claps' }).should('exist')
  cy.findByRole('link', { name: '0 comments' }).should('exist')
  cy.findByRole('link', { name: 'Edit Recipe' }).should('exist')
  cy.findByRole('button', { name: 'Delete Recipe' }).should('exist')
}

export const assertAndClickOnRecipe = (recipe: Recipe, user: User) => {
  cy.findByRole('listitem', { name: `Read the recipe ${recipe.title}` }).within(
    () => {
      cy.findByRole('heading', { name: recipe.title, level: 2 }).should('exist')
      cy.findByRole('link', { name: `Author: ${user.fullname}` }).should(
        'exist'
      )

      cy.findByRole('img', { name: recipe.title }).should('exist')
      cy.findByRole('img', { name: user.fullname }).should('exist')

      cy.findByLabelText('0 claps').should('exist')
      cy.findByLabelText('0 comments').should('exist')

      cy.findByText(/min read$/i).should('exist')
      cy.findByLabelText(/^Posted on 2021-10/i).should('exist')

      cy.clickByRole('link', { name: recipe.title })

      cy.findByRole('heading', {
        name: recipe.title,
      }).should('exist')
    }
  )
}

export const assertAndEditComment = ({
  firstComment,
  secondComment,
  fullname,
}: {
  firstComment: string
  secondComment: string
  fullname: string
}) => {
  cy.findByRole('listitem').within(() => {
    cy.findByRole('link', { name: fullname }).should('exist')
    cy.findByRole('img', { name: fullname }).should('exist')
    cy.findByText(firstComment).should('exist')
    cy.findByRole('button', { name: 'Comment 0 claps' }).should('exist')
    cy.findByText(/^On 2021-10/).should('exist')

    // Edit comment
    cy.clickByRole('button', { name: 'Edit Comment' })
    cy.findByRole('textbox', { name: 'Edit Comment' })
      .should('have.value', firstComment)
      .clear()
      .type(secondComment)
    cy.clickByRole('button', { name: 'Save' })
  })

  cy.findByText('Successfully edited your comment.').should('exist')
  cy.findByRole('textbox', { name: 'Edit Comment' }).should('not.exist')
  cy.findByText(secondComment).should('exist')
}
