'use client'

import React, { FC } from 'react'
import { IChapter } from '@/types'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export interface IChapterActionButton {
  chapter: IChapter
  count: number
  className?: string
}

export const ChapterActionButton: FC<IChapterActionButton> = ({ chapter, count, className = '' }) => {
  const router = useRouter()

  const isFirst = chapter.chapterNumber - 1 === 0
  const isLast = chapter.chapterNumber + 1 > count

  const currentProductUrl = `/product/${chapter.productId}/chapter/`
  const handleClick = (chapterNumber: number) => {
    return router.push(currentProductUrl + chapterNumber)
  }

  return (
    <Box className={cn('w-full flex lg:hidden justify-between sticky bottom-[10px]', className)}>
      <Button
        variant="contained"
        startIcon={<ArrowBack />}
        disabled={isFirst}
        className={isFirst ? 'invisible' : ''}
        onClick={() => handleClick(chapter.chapterNumber - 1)}
      >
        Tập {chapter.chapterNumber - 1}
      </Button>

      <Button variant="outlined" startIcon={<SettingsIcon />} className="backdrop-blur-sm">
        Cài đặt
      </Button>

      <Button
        variant="contained"
        endIcon={<ArrowForward />}
        disabled={isLast}
        className={isLast ? 'invisible' : ''}
        onClick={() => handleClick(chapter.chapterNumber + 1)}
      >
        Tập {chapter.chapterNumber + 1}
      </Button>
    </Box>
  )
}
