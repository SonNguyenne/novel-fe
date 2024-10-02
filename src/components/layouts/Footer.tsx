import React from 'react'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4, mb: 4 }}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Novel
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export const Footer = () => {
  return (
    <footer className="max-h-[90px]">
      <Copyright />
    </footer>
  )
}
