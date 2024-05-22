import { InputCurrency } from '~/components'
import { CountriesList, countriesList, currencyList } from '~/constants'
import { LoadingButton as Button } from '@mui/lab'
import {
  Box,
  Chip,
  Divider,
  Grid,
  InputBaseComponentProps,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchApi } from 'client'
import { useRouter } from 'next/router'
import { ElementType, ReactNode } from 'react'
import { useForm } from 'react-hook-form'

type Salary = {
  currency: string
  period: string
  from: string
  to: string
}

type LocationType = 'in-person' | 'remote'

type FormValues = {
  title: string
  description: string
  locationType: LocationType
  location: {
    country: string
    city: string
  }
  salary: Salary
  tags: string[]
}
// todo: break down this component into smaller chunks

type SkillList = {
  id: string
  name: string
}

const Create = (): JSX.Element => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { register, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      title: undefined,
      description: undefined,
      locationType: 'remote',
      location: {
        country: undefined,
        city: undefined,
      },
      salary: {
        currency: undefined,
        period: undefined,
        from: '0',
        to: '0',
      },
      tags: [],
    },
  })

  const { data, isLoading: skillListLoading } = useQuery(['skills'], () =>
    fetchApi({ url: '/skillList', method: 'GET' })
  )

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: FormValues) => await fetchApi({ url: '/job', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries(['jobs'])
      router.push('/jobs')
    },
  })

  const onSubmit = (data: FormValues): void => mutate(data)

  if (skillListLoading) return <>...</>

  return (
    <Box>
      <Typography variant="h3">Create Job</Typography>

      <Divider sx={{ my: 3 }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">Title</Typography>
            <Typography variant="body2">
              Give a short description for the role you're creating. ie. Senior Front-End Developer
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} marginLeft={2}>
            <TextField
              required
              fullWidth
              variant="outlined"
              label="Job Title"
              inputProps={register('title', { required: true })}
            />
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
              inputProps={register('description', { required: true })}
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
              inputProps={register('locationType', { required: true })}
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
              inputProps={register('location.country', { required: true })}
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
              inputProps={register('location.city', { required: true })}
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
              inputProps={register('salary.currency', { required: true })}
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
              inputProps={register('salary.period', { required: true })}
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
                inputComponent: InputCurrency as unknown as ElementType<InputBaseComponentProps>,
              }}
              defaultValue={''}
              margin="normal"
              onChange={(e): void => {
                const value = e.target.value
                setValue('salary.from', value)
              }}
            />
          </Grid>
          <Grid item xs={12} md={1} marginLeft={2}>
            <TextField
              label="To"
              InputProps={{
                inputComponent: InputCurrency as unknown as ElementType<InputBaseComponentProps>,
              }}
              defaultValue={''}
              margin="normal"
              onChange={(e): void => {
                const value = e.target.value
                setValue('salary.to', value)
              }}
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={0}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">Skills</Typography>
            <Typography variant="body2">What are the skills required for this role?</Typography>
          </Grid>
          <Grid item xs={12} md={4} marginLeft={2}>
            <Select
              multiple
              defaultValue={[]}
              input={<OutlinedInput label="skill" />}
              onChange={(e): void => setValue('tags', e.target.value as string[])}
              renderValue={(selected): ReactNode => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as string[]).map((value: string) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              sx={{ minWidth: 200 }}
            >
              {data?.skillList.map(({ name }: SkillList) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Button disabled={isLoading} loading={isLoading} variant="contained" type="submit" size="large">
          Next
        </Button>
      </form>
    </Box>
  )
}

export default Create
