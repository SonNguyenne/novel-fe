import { DarkMode, WbSunny } from '@mui/icons-material'
import { IconButton, Tooltip, useColorScheme } from '@mui/material'
import React from 'react'

export const ThemeModeButton = () => {
  const { mode, setMode } = useColorScheme()
  if (!mode) setMode('light')

  return mode === 'light' ? (
    <Tooltip title="Light mode" onClick={() => setMode('dark')}>
      <IconButton color="primary" size="small">
        <WbSunny />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title="Dark mode" onClick={() => setMode('light')}>
      <IconButton size="small">
        <DarkMode />
      </IconButton>
    </Tooltip>
  )
}