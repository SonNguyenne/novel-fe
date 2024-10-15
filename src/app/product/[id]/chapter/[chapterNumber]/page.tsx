'use client'

import { useEffect, useState } from 'react'
import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { IChapter } from '@/types'
import { ChapterActionButton } from '@/components'

interface IPageParams {
  params: { id: number; chapterNumber: number }
}

export default function Page({ params }: IPageParams) {
  const { id, chapterNumber } = params
  const [chapter, setChapter] = useState<IChapter>()
  const [chapters, setChapters] = useState<IChapter[]>([])

  useEffect(() => {
    const fetchApi = async () => {
      await Promise.all([fetch(`/api/product/${id}/chapter`), fetch(`/api/product/${id}/chapter/${chapterNumber}`)])
        .then(async ([chaptersResp, chapterResp]) => {
          return {
            chapters: (await chaptersResp.json()) as IChapter[],
            chapter: (await chapterResp.json()) as IChapter,
          }
        })
        .then(({ chapters, chapter }) => {
          setChapters(chapters)
          setChapter(chapter)
        })
    }

    fetchApi()
  }, [chapterNumber, id])

  useEffect(() => {
    const incrementViewCount = async () => {
      // TODO: Cant send
      await fetch(`/api/product/${id}/view`, { method: 'POST' })
    }

    incrementViewCount()
  }, [id])

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

      <ChapterActionButton chapter={chapter} count={chapters.length} className="gap-2 " />
    </Container>
  )
}
