'use client'

import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { createTheme } from '@mui/material/styles'

export function ThemeClientProvider({ children }: { children: React.ReactNode }) {
  const theme = createTheme({
    colorSchemes: { light: true, dark: true },
    palette: {
      // mode: mode === 'dark' ? 'dark' : 'light',
      // primary: {
      //   main: 'hsl(var(--primary))',
      //   light: 'hsl(var(--primary-light))',
      //   dark: 'hsl(var(--primary-dark))',
      //   contrastText: '#ffffff',
      // },
      // secondary: {
      //   main: '#edf2ff',
      // },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
