import { User } from '@firebase/auth'
import { FieldValue, Timestamp } from '@firebase/firestore'

export type UserData = {
  username: string | null
  user: User | null | undefined
}

export type UserProfile = {
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
  joined: FieldValue | Timestamp | number
  uid: string
}

export type Recipe = {
  title: string
  body: string
  commentsCount: number
  clapCount: number
  username: string
  createdAt: FieldValue | Timestamp | number
  uid: string
  imageUrl: string
  slug: string
  readingTime: string
}
