import { InputCurrency } from '@/components'
import { CountriesList, countriesList, currencyList } from '@/constants'
import { Box, Button, Divider, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { fetchApi } from 'client'
import { useForm } from 'react-hook-form'
type FormValues = {
  title: string
  description: string
  locationType: string
  location: {
    country: string
    city: string
  }
  salary: {
    currency: string
    period: string
    from: string
    to: string
  }
}

const Create = () => {
  const { register, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      locationType: '',
      location: {
        country: '',
        city: '',
      },
      salary: {
        currency: '',
        period: '',
        from: '0',
        to: '0',
      },
    },
  })

  const handleChange = async (data: FormValues, event: any) => {
    event.preventDefault()
    console.log({ data })
    try {
      const res = await fetchApi({ url: '/job', body: data })
      console.log({ res })
    } catch (error) {
      console.log({ error })
    }
  }
  return (
    <Box>
      <Typography variant="h3">Create Job</Typography>

      <Divider sx={{ my: 3 }} />
      <form onSubmit={handleSubmit(handleChange)}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">Title</Typography>
            <Typography variant="body2">
              Give a short description for the role you're creating. ie. Senior Front-End Developer
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} marginLeft={2}>
            <TextField required fullWidth variant="outlined" label="Job Title" inputProps={register('title')} />
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={0}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">Description</Typography>
            <Typography variant="body2">Describe the job for potential candidates</Typography>
          </Grid>
          <Grid item xs={12} md={4} marginLeft={2}>
            <TextField
              label="Description"
              multiline
              fullWidth
              margin="normal"
              defaultValue=""
              minRows={4}
              inputProps={register('description')}
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={0}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">Location</Typography>
            <Typography variant="body2">
              Where the candidate should be located? Is it a remote, hybrid or in-person?
            </Typography>
          </Grid>
          <Grid item xs={12} md={1} marginLeft={2}>
            <TextField
              label="Location Type"
              select
              fullWidth
              margin="normal"
              defaultValue=""
              minRows={4}
              inputProps={register('locationType')}
            >
              <MenuItem value="remote">Remote</MenuItem>
              <MenuItem value="hybrid">Hybrid</MenuItem>
              <MenuItem value="in-person">In-Person</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={1} marginLeft={2}>
            <TextField
              label="Country"
              select
              fullWidth
              margin="normal"
              defaultValue=""
              inputProps={register('location.country')}
            >
              {countriesList.map((country: CountriesList) => (
                <MenuItem key={country.name} value={country.name}>
                  {country.name}
                </MenuItem>
              ))}
              <MenuItem value="remote">Remote</MenuItem>
              <MenuItem value="hybrid">Hybrid</MenuItem>
              <MenuItem value="in-person">In-Person</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={2} marginLeft={2}>
            <TextField
              label="Province and/or City"
              fullWidth
              margin="normal"
              defaultValue=""
              inputProps={register('location.city')}
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={0}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">Compensation</Typography>
            <Typography variant="body2">What's the currency and the budget for this role?</Typography>
          </Grid>
          <Grid item xs={12} md={1} marginLeft={2}>
            <TextField
              label="Currency type"
              select
              fullWidth
              margin="normal"
              defaultValue=""
              inputProps={register('salary.currency')}
            >
              {currencyList.map((currency) => (
                <MenuItem key={currency.name} value={currency.value}>
                  {currency.symbol} - {currency.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={1} marginLeft={2}>
            <TextField
              label="Periodicity"
              select
              fullWidth
              margin="normal"
              defaultValue=""
              inputProps={register('salary.period')}
            >
              {['annual', 'monthly', 'weekly', 'daily', 'hourly'].map((period) => (
                <MenuItem key={period} value={period}>
                  {period}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={1} marginLeft={2}>
            <TextField
              label="From"
              InputProps={{
                inputComponent: InputCurrency as any,
              }}
              defaultValue={''}
              margin="normal"
              onChange={(e) => {
                const value = e.target.value
                setValue('salary.from', value)
              }}
            />
          </Grid>
          <Grid item xs={12} md={1} marginLeft={2}>
            <TextField
              label="To"
              InputProps={{
                inputComponent: InputCurrency as any,
              }}
              defaultValue={''}
              margin="normal"
              onChange={(e) => {
                const value = e.target.value
                setValue('salary.to', value)
              }}
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Button variant="contained" type='submit' size="large">
          Next
        </Button>
      </form>
    </Box>
  )
}

export default Create
