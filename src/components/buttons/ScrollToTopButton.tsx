'use client'

import { Avatar, Tooltip } from '@mui/material'
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
      <Avatar className="z-50 !fixed bottom-14 right-5 !bg-blue-100/50 border !border-blue-200/50 rounded-full animate-bounce size-12 hover:size-14 transition-all cursor-pointer">
        <ExpandLessIcon fontSize="large" color="primary" />
      </Avatar>
    </Tooltip>
  )
}
