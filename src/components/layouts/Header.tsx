'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Drawer from '@mui/material/Drawer'
import MenuIcon from '@mui/icons-material/Menu'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Link from 'next/link'
import IconButton from '@mui/material/IconButton'
import { ThemeModeButton } from '../buttons'
import { useAuth } from '@/hooks'
import { Tooltip } from '@mui/material'
import { Container } from '@/components'

export const Header = () => {
  const { token, logout } = useAuth()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId)
    const offset = 128
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset
      sectionElement.scrollIntoView({ behavior: 'smooth' })
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      })
      setOpen(false)
    }
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 2,
      }}
    >
      <Container>
        <Toolbar
          variant="regular"
          sx={theme => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '999px',
            bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(24px)',
            maxHeight: 40,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
          })}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              px: 0,
            }}
          >
            <Link href="/">
              <Box className="flex items-center gap-2">
                <Image
                  className="h-10 sm:h-14 w-auto cursor-pointer"
                  src={'/logo.png'}
                  width={457}
                  height={175}
                  alt="logo"
                  priority
                />

                <Typography color="primary" className="font-bold hidden sm:block sm:text-xl">
                  ReadOrDead
                </Typography>
              </Box>
            </Link>
            {token && (
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem
                  onClick={() => router.push('/products-management')}
                  sx={{ py: '6px', px: '12px' }}
                  className="hover:bg-inherit hover:[&>*]:text-black"
                >
                  <Typography variant="body2" color="text.primary">
                    My Products
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => router.push('/categories-management')}
                  sx={{ py: '6px', px: '12px' }}
                  className="hover:bg-inherit hover:[&>*]:text-black"
                >
                  <Typography variant="body2" color="text.primary">
                    Categories Management
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => router.push('/chapters-management')}
                  sx={{ py: '6px', px: '12px' }}
                  className="hover:bg-inherit hover:[&>*]:text-black"
                >
                  <Typography variant="body2" color="text.primary">
                    Chapters Management
                  </Typography>
                </MenuItem>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 0.5,
              alignItems: 'center',
            }}
          >
            <ThemeModeButton />
            {!token ? (
              <>
                <Link href="/login">
                  <Button color="primary" variant="text" size="medium">
                    Sign in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button color="primary" variant="contained" size="medium">
                    Sign up
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Tooltip title="Favorite list" onClick={() => router.push('/list')}>
                  <IconButton aria-label="delete" color="error" size="small">
                    <FavoriteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  component="a"
                  onClick={() => {
                    logout()
                  }}
                >
                  Log out
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ display: { sm: '', md: 'none' } }}>
            <ThemeModeButton />
            <Button
              variant="text"
              color="primary"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ minWidth: '30px', p: '4px' }}
            >
              <MenuIcon />
            </Button>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              <Box
                sx={{
                  minWidth: '60dvw',
                  p: 2,
                  backgroundColor: 'background.paper',
                  flexGrow: 1,
                }}
              >
                <MenuItem onClick={() => scrollToSection('features')}>Features</MenuItem>
                <MenuItem onClick={() => scrollToSection('testimonials')}>Testimonials</MenuItem>
                <MenuItem onClick={() => scrollToSection('highlights')}>Highlights</MenuItem>
                <MenuItem onClick={() => scrollToSection('pricing')}>Pricing</MenuItem>
                <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
                <Divider />
                <MenuItem>
                  <Button color="primary" variant="contained" component="a" href="/register" sx={{ width: '100%' }}>
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" component="a" href="/login" sx={{ width: '100%' }}>
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
