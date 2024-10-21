import { DarkMode, WbSunny } from '@mui/icons-material'
import { IconButton, Tooltip, useColorScheme } from '@mui/material'
import React from 'react'

export const ThemeModeButton = () => {
  const { mode, setMode } = useColorScheme()
  if (!mode) {
    setMode('light')
    return null
  }

  return mode === 'dark' ? (
    <Tooltip title="Sáng" onClick={() => setMode('light')}>
      <IconButton>
        <DarkMode />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title="Tối" onClick={() => setMode('dark')}>
      <IconButton color="warning">
        <WbSunny />
      </IconButton>
    </Tooltip>
  )
}
