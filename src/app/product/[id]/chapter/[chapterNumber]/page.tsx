import React from 'react'
import { Chapter } from './Chapter'

interface IPageParams {
  params: { id: number; chapterNumber: number }
}

export default async function Page({ params }: IPageParams) {
  const { id, chapterNumber } = params
  const chapters = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}/chapter`).then(res => res.json())
  const chapter = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}/chapter/${chapterNumber}`).then(res =>
    res.json(),
  )

  if (!chapter) return

  return <Chapter chapters={chapters} chapter={chapter} />
}
