import { Recipe, Chef } from './generate'

export const assertPreviewMode = (recipe: Recipe, chef: Chef) => {
  // Turn on Preview Mode
  cy.clickByRole('button', { name: 'Preview' })
  cy.findByRole('heading', { name: 'Edit Recipe' }).should('not.exist')

  // Assert preview page
  cy.assertRecipeDetail(recipe, chef)

  // Turn off preview mode
  cy.clickByRole('button', { name: 'Preview', shouldForceClick: true })
  cy.findByRole('heading', { name: 'Edit Recipe', timeout: 8000 }).should(
    'exist'
  )
}

export const assertRecipeDetail = (recipe: Recipe, chef: Chef) => {
  cy.findByRole('heading', { name: recipe.title }).should('exist')
  cy.findByText(recipe.body).should('exist')
  cy.findByRole('link', { name: chef.fullname }).should('exist')
  cy.findByRole('img', { name: recipe.title }).should('exist')
  cy.findByText(/^Posted on 2021-11/i).should('exist')
  cy.findByRole('button', { name: 'Recipe 0 claps' }).should('exist')
  cy.findByRole('link', { name: '0 comments' }).should('exist')
  cy.findByRole('link', { name: 'Edit Recipe' }).should('exist')
  cy.findByRole('button', { name: 'Delete Recipe' }).should('exist')
}

export const assertAndClickOnRecipe = (recipe: Recipe, chef: Chef) => {
  cy.findByRole('listitem', { name: recipe.title }).within(() => {
    cy.findByRole('heading', {
      name: `Read more about ${recipe.title}`,
      level: 2,
    }).should('exist')
    cy.findByRole('link', { name: `Author: ${chef.fullname}` }).should('exist')

    cy.findByRole('img', { name: recipe.title }).should('exist')
    cy.findByRole('img', { name: chef.fullname }).should('exist')

    cy.findByLabelText('0 claps').should('exist')
    cy.findByLabelText('0 comments').should('exist')

    cy.findByText(/min read$/i).should('exist')
    cy.findByLabelText(/^Posted on 2021-11/i).should('exist')

    cy.clickByRole('link', { name: `Read more about ${recipe.title}` })
  })
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
    cy.findByText(/^On 2021-11/).should('exist')

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

export const assertAndClickOnSecondChef = (chef: Chef) => {
  cy.findByRole('img', { name: chef.fullname }).should('exist')
  cy.findByRole('heading', { name: chef.fullname }).should('exist')
  cy.findByText(`@${chef.username}`).should('exist')
  cy.findByText(chef.location).should('exist')
  cy.clickByRole('link', { name: `@${chef.username}` })
}
