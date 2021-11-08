import { User } from '@firebase/auth'
import { FieldValue, Timestamp } from '@firebase/firestore'

export type DateType = FieldValue | Timestamp | number

export type CreatedAt = { createdAt: DateType }

export type UserData = {
  username: string | null
  user: User | null | undefined
}

export type ChefProfile = {
  username: string
  email: string
  fullname: string
  age: string
  work: string
  location: string
  bio: string
  avatarUrl: string
  clapCount: number
  recipeCount: number
  createdAt: DateType
  uid: string
} & CreatedAt

export type Recipe = {
  title: string
  body: string
  commentsCount: number
  clapCount: number
  createdAt: DateType
  uid: string
  imageUrl: string
  slug: string
  readingTime: string
  authorUsername: string
  authorAvatarUrl: string
  authorFullname: string
} & CreatedAt

export type Comment = {
  text: string
  clapCount: number
  uid: string
  authorUsername: string
  authorAvatarUrl: string
  authorFullname: string
  id: string
} & CreatedAt
