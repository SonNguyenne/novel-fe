'use client'

import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { Container } from '@/components'

const Register = () => {
  const router = useRouter()
  const [submit, setSubmit] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)
  const [errorText, setErrorText] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmit(true)

    if (!firstName || !lastName || !email || !password) return

    if (checked === false) return setErrorText('Please accept the terms and conditions')

    return fetch('api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name: lastName + ' ' + firstName, email, password }),
    })
      .then(async res => {
        const json = await res.json()
        if (!res.ok) throw new Error(json.message)

        return router.push('/login')
      })
      .catch((err: Error) => setErrorText(err.message))
  }

  return (
    <Container component="main" maxWidth="xs" className="flex justify-center items-center">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={e => {
                  setFirstName(e.target.value)
                }}
                error={submit && !firstName}
                helperText={submit && !firstName ? 'This field is required' : ''}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={e => {
                  setLastName(e.target.value)
                }}
                error={submit && !lastName}
                helperText={submit && !lastName ? 'This field is required' : ''}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => {
                  setEmail(e.target.value)
                }}
                error={submit && !email}
                helperText={submit && !email ? 'This field is required' : ''}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={e => {
                  setPassword(e.target.value)
                }}
                error={submit && !password}
                helperText={submit && !password ? 'This field is required' : ''}
              />
            </Grid>
            <Grid size={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={checked}
                    onChange={() => {
                      setChecked(!checked)
                    }}
                    color="primary"
                  />
                }
                label="I accept the terms and conditions"
              />
            </Grid>
          </Grid>
          <span className={`text-[#d32f2f] ${errorText && submit ? 'block' : 'hidden'}`}>{errorText}</span>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Register
