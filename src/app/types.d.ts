export enum PRODUCT_STATUS {
  PROGRESS = 'PROGRESS',
  ENUM = 'ENUM',
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
