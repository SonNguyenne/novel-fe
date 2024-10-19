'use client'

import React, { FC } from 'react'
import { IChapter, ITextStyle } from '@/types'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormGroup,
  FormLabel,
  Popover,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export interface IChapterActionButton {
  chapter: IChapter
  count: number
  className?: string
  textStyle: ITextStyle
  handleChangeTextStyle: (state: Partial<ITextStyle>) => void
}

export const ChapterActionButton: FC<IChapterActionButton> = ({
  chapter,
  count,
  className = '',
  textStyle,
  handleChangeTextStyle,
}) => {
  const router = useRouter()

  const matched = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const isFirst = chapter.chapterNumber - 1 === 0
  const isLast = chapter.chapterNumber + 1 > count

  const currentProductUrl = `/product/${chapter.productId}/chapter/`
  const handleClick = (chapterNumber: number) => {
    return router.push(currentProductUrl + chapterNumber)
  }

  const handleSettingClick = event => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <Box className={cn('w-full flex md:hidden justify-between sticky bottom-[10px]', className)}>
      <Button
        variant="contained"
        startIcon={<ArrowBack />}
        disabled={isFirst}
        className={isFirst ? 'invisible' : ''}
        onClick={() => handleClick(chapter.chapterNumber - 1)}
      >
        Tập {chapter.chapterNumber - 1}
      </Button>

      <Button variant="contained" color="secondary" startIcon={<SettingsIcon />} onClick={handleSettingClick}>
        Cài đặt
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: matched ? 'bottom' : 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: matched ? 'top' : 'bottom',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* TODO: Combobox for font family */}

          <FormControl>
            <FormLabel>Kích cỡ chữ ({textStyle.fontSize.toFixed(1)})</FormLabel>
            <FormGroup sx={{ pt: 1 }}>
              <ButtonGroup aria-label="Small button group">
                <Button
                  disabled={textStyle.fontSize <= 0.2}
                  onClick={() => handleChangeTextStyle({ fontSize: textStyle.fontSize - 0.1 })}
                >
                  Giảm
                </Button>
                <Button onClick={() => handleChangeTextStyle({ fontSize: 1 })}>Khôi phục</Button>
                <Button onClick={() => handleChangeTextStyle({ fontSize: textStyle.fontSize + 0.1 })}>Tăng</Button>
              </ButtonGroup>
            </FormGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Đậm nhạt</FormLabel>
            <FormGroup sx={{ pt: 1 }}>
              <ButtonGroup aria-label="Small button group">
                <Button
                  onClick={() => handleChangeTextStyle({ fontWeight: 300 })}
                  variant={textStyle.fontWeight === 300 ? 'contained' : 'outlined'}
                >
                  Nhạt
                </Button>
                <Button
                  onClick={() => handleChangeTextStyle({ fontWeight: 400 })}
                  variant={textStyle.fontWeight === 400 ? 'contained' : 'outlined'}
                >
                  Bình thường
                </Button>
                <Button
                  onClick={() => handleChangeTextStyle({ fontWeight: 600 })}
                  variant={textStyle.fontWeight === 600 ? 'contained' : 'outlined'}
                >
                  Hơi đậm
                </Button>
                <Button
                  onClick={() => handleChangeTextStyle({ fontWeight: 700 })}
                  variant={textStyle.fontWeight === 700 ? 'contained' : 'outlined'}
                >
                  Đậm
                </Button>
              </ButtonGroup>
            </FormGroup>
          </FormControl>
        </Box>
      </Popover>

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
