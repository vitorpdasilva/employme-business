import { InputCurrency } from '@/components'
import { CountriesList, countriesList, currencyList } from '@/constants'
import { LoadingButton as Button } from '@mui/lab'
import {
  Box,
  Chip,
  Divider,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchApi } from 'client'
import { useRouter } from 'next/router'
import { useState } from 'react'
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
// todo: break down this component into smaller chunks
type SkillList = {
  id: string
  name: string
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  }
}

const Create = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const theme = useTheme()
  const [personName, setPersonName] = useState<string[]>([])

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

  const onSubmit = (data: FormValues) => mutate(data)

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }
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
        <Grid container spacing={0}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">Skills</Typography>
            <Typography variant="body2">What are the skills required for this role?</Typography>
          </Grid>
          <Grid item xs={12} md={4} marginLeft={2}>
            <Select
              multiple
              defaultValue={personName}
              input={<OutlinedInput label="something" />}
              onChange={handleChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as unknown as string[]).map((value: string) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {data.skillList.map(({ name }: SkillList) => (
                <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
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
