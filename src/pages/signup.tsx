import { Box, Button, Grid, Link, TextField, Typography, styled } from '@mui/material'
import { useForm } from 'react-hook-form'
import { onSignUp } from '~/queries'

const FormWrapper = styled(Box)({
  border: '1px solid #c5c5c5',
  display: 'flex',
  flexDirection: 'column',
  padding: '3em',
  borderRadius: '10px',
  justifyContent: 'space-around',
  background: '#f3f3f3',
  '& input': {
    background: '#fff',
  },
})

type Credentials = {
  name: string
  email: string
  password: string
}

const Login = (): JSX.Element => {
  const { onCall, loading } = onSignUp()
  const { register, handleSubmit } = useForm<Credentials>()

  const onSubmit = handleSubmit(async (data) => {
    onCall(data)
  })

  return (
    <FormWrapper component="form" onSubmit={onSubmit}>
      <Typography component="h1" variant="h5">
        Create your company account
      </Typography>
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
        <TextField
          {...register('name', { required: true })}
          label="Full name"
          variant="outlined"
          fullWidth
          placeholder='e.g. "John Doe"'
          required
        />
        <TextField
          {...register('email', { required: true })}
          label="Work Email"
          variant="outlined"
          fullWidth
          placeholder="e.g. email@email.com"
          required
        />
        <TextField {...register('password', { required: true })} label="Password" fullWidth variant="outlined" />

        <Button disabled={loading} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
    </FormWrapper>
  )
}

export default Login
