'use client'
import { useEffect, useState } from 'react'
import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { getApi, getOne } from '@/api'
import { IChapter } from '@/types'
import { ChapterActionButton } from '@/components'

interface IPageParams {
  params: { id: number; chapterNumber: number }
}

export default function Page({ params }: IPageParams) {
  const [chapter, setChapter] = useState<IChapter>()
  const [chapters, setChapters] = useState<IChapter[]>([])

  useEffect(() => {
    const fetchApi = async () => {
      const [respChapters, resChapter] = await Promise.all([
        getApi<IChapter[]>(`product/${params.id}/chapter`),
        getOne<IChapter>(`product/${params.id}/chapter`, params.chapterNumber),
      ])

      setChapters(respChapters)
      setChapter(resChapter)
    }

    fetchApi()
  }, [params.chapterNumber, params.id])

  if (!chapter) return

  return (
    <Container maxWidth="xl" sx={{ position: 'relative' }}>
      <Box className="flex flex-col justify-center">
        <Typography variant="h4" className="font-bold text-center">
          Chap {chapter.chapterNumber} - {chapter.chapterName}
        </Typography>

        <ChapterActionButton
          className="mt-6 hidden lg:flex justify-center gap-2 sticky top-[90px]"
          chapter={chapter}
          count={chapters.length}
        />

        <Box>
          <Typography
            variant="body1"
            className="py-5 leading-10 tracking-wider"
            dangerouslySetInnerHTML={{ __html: chapter.content }}
          />
        </Box>
      </Box>

      <ChapterActionButton chapter={chapter} count={chapters.length} />
    </Container>
  )
}
