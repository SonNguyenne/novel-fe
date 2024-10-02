import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { Grid } from '@mui/material'

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      className="flex-1"
    >
      <Grid container spacing={2} className="flex flex-col lg:flex-row justify-center items-center gap-4">
        <Grid xs={6} className="lg:order-1 flex flex-col justify-center items-center">
          <Typography variant="h1">404</Typography>
          <Typography variant="h6" className="text-center">
            The page you’re looking for doesn’t exist.
          </Typography>
          <Link href="/">
            <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
              Back Home
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}

export default NotFound
