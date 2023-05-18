import { useIsAuthenticated } from '@/hooks'
import { userDataStore } from '@/stores'
import { Alert, Avatar, Box, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import { ErrorResponse, fetchApi } from 'client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Resolver, useForm } from 'react-hook-form'

type Credentials = {
  email: string
  password: string
  name: string
}

const resolver: Resolver<Credentials> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
        email: { type: 'required', message: 'email is required' },
        password: { type: 'required', message: 'password is required' },
        name: { type: 'required', message: 'name is required' },
      }
      : {},
  }
}

const Login = () => {
  const { register, handleSubmit } = useForm<Credentials>({ resolver })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const setUser = userDataStore((state: any) => state.setUser)
  const { isAuthenticated } = useIsAuthenticated()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    setErrorMessage(null)
    const body = {
      email: data.email,
      password: data.password,
      name: data.name,
    }

    try {
      const { user, token } = await fetchApi({ url: '/register', body })
      setUser(user, token)
      router.push('/')
    } catch (error: any) {
      setErrorMessage(error?.message as ErrorResponse['message'])
    }
  })

  return (
    <Grid container component="main" sx={{ height: '100vh', width: '100vw', position: 'absolute', left: 0, top: 0 }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
            {errorMessage && (
              <Alert sx={{ my: 2 }} severity="error">
                {errorMessage}
              </Alert>
            )}
            <TextField {...register('name')} label="Your Name" variant="outlined" margin="normal" fullWidth required />
            <TextField {...register('email')} label="Email" variant="outlined" margin="normal" fullWidth required />
            <TextField
              {...register('password')}
              type="password"
              label="password"
              variant="outlined"
              margin="normal"
              fullWidth
              required
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign up
            </Button>
            <Grid container>
              <Grid item>
                <Typography sx={{ mt: 2 }} variant="caption" color="text.secondary">
                  Already have an account? <Link href="/auth/login">Sign in</Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Login
