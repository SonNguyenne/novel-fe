import { Box, Paper, SxProps, Typography } from '@mui/material'
import React from 'react'

export interface ICardPaper {
  children: React.ReactNode
  title: string
  sx?: SxProps<typeof Paper>
}

export const CardPaper = ({ children, title, sx = {} }) => {
  return (
    <Paper elevation={6} sx={{ borderRadius: 2, ...sx }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4">{title}</Typography>
      </Box>

      {children}
    </Paper>
  )
}
