export enum PRODUCT_STATUS {
  PROGRESS = 'PROGRESS',
  DONE = 'DONE',
}

export interface IProduct {
  id: number
  userId: number
  authorName: string
  name: string
  source: string
  status: PRODUCT_STATUS
  image: string
  viewCount: number
  description?: string
  createdAt: string
  updatedAt: string
  averageRate: number
  chapterCount: number
  categories?: ICategory[]
}

export interface ICategory {
  id: number
  name: string
  description?: string
}

export interface IChapter {
  id: number
  productId: number
  chapterName: string
  content: string
  chapterNumber: number
  price: number
  createdAt: string
  updatedAt: string
  users: number[]
}

export interface IRate {
  id: number
  userId: number
  productId: number
  rating: number
  createdAt: string
  updatedAt: string
}

export interface User {
  id: number
  name: string
  email: string
  phone: string | null
  birthdate: string | null
  picture: string | null
  money: number
  refreshToken: string | null
  emailVerified: boolean
  createdAt: string
}

export interface LoginResponse {
  token: string
  data: User
}

export interface LoginRequest {
  email: string
  password: string
}
