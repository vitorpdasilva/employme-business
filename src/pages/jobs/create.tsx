import { Box, Divider, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

const Create = () => {
  const { register, handleSubmit } = useForm<any>()

  const handleChange = () => {}
  return (
    <Box>
      <Typography variant="h3">Create Job</Typography>
      <Divider sx={{ my: 3 }} />
      <form>
        <Grid container spacing={0}>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1">Job Title</Typography>
            <Typography variant="subtitle2">Give a short description for the role you're creating</Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField required variant="outlined" label="Job Title" />
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={0}>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1">Preferred years of experience (optional)</Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              select
              margin="normal"
              defaultValue={''}
              label="Where are you currently located?"
              inputProps={register('currentLocation')}
              onChange={handleSubmit(handleChange)}
            >
              {Array.from({ length: 10 }).map((item, index) => (
                <MenuItem key={item as number} value={index + 1}>
                  {index + 1} years of experience
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default Create
