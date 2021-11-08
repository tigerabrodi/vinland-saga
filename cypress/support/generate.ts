import { build, fake } from '@jackfranklin/test-data-bot'

export type Chef = {
  email: string
  username: string
  password: string
  fullname: string
  age: number
  work: string
  location: string
  bio: string
}

export type Recipe = {
  title: string
  body: string
}

export type Comments = {
  firstComment: string
  secondComment: string
  editedComment: string
}

export const buildUser = build<Chef>('Chef', {
  fields: {
    username: fake((f) => f.internet.userName().toLowerCase()),
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password()),
    fullname: fake((f) => f.name.firstName()),
    age: fake((f) => f.random.number(40)),
    work: fake((f) => f.company.companyName()),
    location: fake((f) => f.address.city()),
    bio: fake((f) => f.random.words(3)),
  },
})

export const buildRecipe = build<Recipe>('Recipe', {
  fields: {
    title: fake((f) => f.name.title()),
    body: fake((f) => f.random.words(3)),
  },
})

export const buildComments = build<Comments>('Comment', {
  fields: {
    firstComment: fake((f) => f.lorem.words(3)),
    secondComment: fake((f) => f.lorem.words(3)),
    editedComment: fake((f) => f.lorem.words(3)),
  },
})
