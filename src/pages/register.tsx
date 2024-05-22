import { countriesList, CountriesList } from '~/constants'
import { useIsAuthenticated } from '~/hooks'
import { userStore } from '~/stores'
import { Alert, Avatar, Box, Button, Grid, Link, MenuItem, Paper, TextField, Typography } from '@mui/material'
import { ErrorResponse, fetchApi } from 'client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type Credentials = {
  companyName: string
  adminEmail: string
  location: {
    country: string
  }
}

const Login = (): JSX.Element => {
  const { register, handleSubmit } = useForm<Credentials>()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const setUser = userStore((state) => state.setUser)
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
      companyName: data.companyName,
      adminEmail: data.adminEmail,
      location: data.location,
    }

    try {
      const { user } = await fetchApi({ url: '/register', body })
      setUser(user)
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
            Register your company with us and start receiving qualified applicants from overseas!
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
            {errorMessage && (
              <Alert sx={{ my: 2 }} severity="error">
                {errorMessage}
              </Alert>
            )}
            <TextField
              {...register('companyName')}
              label="Your company's name"
              variant="outlined"
              margin="normal"
              fullWidth
              required
            />
            <TextField
              {...register('adminEmail')}
              label="The main email address of your company"
              variant="outlined"
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="One or more countries your company has offices in"
              select
              fullWidth
              margin="normal"
              defaultValue=""
              inputProps={register('location.country', { required: true })}
            >
              {countriesList.map((country: CountriesList) => (
                <MenuItem key={country.name} value={country.name}>
                  {country.name}
                </MenuItem>
              ))}
            </TextField>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Typography sx={{ mt: 2 }} variant="caption" color="text.secondary">
                  Already have an account? <Link href="/login">Sign in</Link>
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
