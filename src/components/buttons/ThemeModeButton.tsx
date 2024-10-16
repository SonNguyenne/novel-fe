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
    <Tooltip title="Dark mode" onClick={() => setMode('light')}>
      <IconButton>
        <DarkMode />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title="Light mode" onClick={() => setMode('dark')}>
      <IconButton color="warning">
        <WbSunny />
      </IconButton>
    </Tooltip>
  )
}
