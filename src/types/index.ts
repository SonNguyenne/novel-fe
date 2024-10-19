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

export interface IUser {
  id: number
  name?: string
  email?: string
  phone?: string | null
  birthdate?: string | null
  picture?: string | null
  money?: number
  refreshToken?: string | null
  emailVerified?: boolean
  createdAt?: string
  access_token?: string
}

export interface LoginResponse {
  access_token: string
  data: IUser
}

export interface LoginRequest {
  email: string
  password: string
}

export interface SessionLogin {
  accessToken?: string
  user?: IUser
}

export interface UserRole {
  role: 'ADMIN' | 'MANAGER' | string // Define other fields as needed
}

export interface DashboardProps {
  products: IProduct[]
  categories: ICategory[]
  doneProducts: IProduct[]
}

export interface ProductDetailProps {
  id: number
  products: IProduct[]
  product: IProduct
  chapters: IChapter[]
  rates: IRate[]
  user?: IUser
}
export interface ITextStyle {
  fontFamily?: string
  fontWeight: number
  fontSize: number
  lineHeight: number
  letterSpacing: number
}
