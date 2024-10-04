'use client'

import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useRouter } from 'next/navigation'
import { postApi } from '@/lib/api'
import { LoginRequest, LoginResponse } from '@/types'
import { useAuth } from '@/hooks'

const Login = () => {
  const router = useRouter()
  const { login } = useAuth()
  const [submit, setSubmit] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorText, setErrorText] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmit(true)

    if (!email || !password) return

    try {
      const res = await fetch('api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) throw new Error('Đăng nhập thất bại')

      const data = (await res.json()) as LoginResponse
      login(data.token, data.data)

      return router.push('/')
    } catch {
      throw new Error('Đăng nhập thất bại')
    }
  }

  React.useEffect(() => {
    router.prefetch('/')
  }, [router])

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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => {
              setEmail(e.target.value)
            }}
            error={submit && !email}
            helperText={submit && !email ? 'This field is required' : ''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => {
              setPassword(e.target.value)
            }}
            error={submit && !password}
            helperText={submit && !password ? 'This field is required' : ''}
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Typography color="error" className={`mt-2 ${errorText && submit ? 'block' : 'hidden'}`}>
            {errorText}
          </Typography>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
