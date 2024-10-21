import { ICategory, IProduct, PRODUCT_STATUS } from '@/types'
import Dashboard from './dashboard'

export default async function Home() {
  const products: IProduct[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`).then(res => res.json())
  const categories: ICategory[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`).then(res => res.json())

  const doneProducts = products?.filter(d => d.status === PRODUCT_STATUS.DONE)

  return <Dashboard products={products} categories={categories} doneProducts={doneProducts} />
}
