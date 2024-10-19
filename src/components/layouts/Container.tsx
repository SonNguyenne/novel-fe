import { Container as MuiContainer, ContainerProps } from '@mui/material'

export const Container = ({ children, sx = {}, className = '', ...props }: ContainerProps) => {
  return (
    <MuiContainer
      maxWidth="xl"
      sx={{
        width: {
          xs: '320px',
          sm: '600px',
          md: '900px',
          lg: '1200px',
          xl: '1720px',
        },
        ...sx,
      }}
      className={className}
      {...props}
    >
      {children}
    </MuiContainer>
  )
}
