'use client'

import { Box, Fab, Tooltip } from '@mui/material'
import React from 'react'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

export const ScrollToTopButton = () => {
  const handleScroll = () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

  return (
    <Tooltip title="Scrol to top" onClick={() => handleScroll()}>
      <Box
        sx={{ '& > :not(style)': { m: 1 } }}
        className="opacity-50 hover:opacity-100 transition-all z-50 !fixed bottom-14 right-5 rounded-full animate-bounce size-14 cursor-pointer"
      >
        <Fab size="medium" color="primary" aria-label="add">
          <ExpandLessIcon fontSize="medium" />
        </Fab>
      </Box>
    </Tooltip>
  )
}
