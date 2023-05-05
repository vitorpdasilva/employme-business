import { Button } from '@mui/material'
import Link from 'next/link'
const Jobs = () => {
  // const createJob = async () => {
  //   try {
  //     await fetchApi({
  //       url: '/job',
  //       body: {
  //         id: Math.ceil(Math.random() * 10000),
  //         title: 'Front-End Senior Test Engineer',
  //         applicants: [],
  //         locationType: 'Remote',
  //         description: `description fake num ${Math.ceil(Math.random() * 100000)}`,
  //         location: {
  //           country: 'United States',
  //           city: 'New York',
  //           province: 'New York',
  //         },
  //         tags: ['react', 'javascript', 'typescript', 'html', 'css', 'jest', 'cypress'],
  //         salary: {
  //           min: 100000,
  //           max: 120000,
  //           period: 'annual',
  //           currency: 'USD',
  //         },
  //       },
  //     })
  //   } catch (error) {
  //     console.error({ error })
  //   }
  // }

  return (
    <div>
      <h1>Jobs</h1>
      <Link href="/jobs/create">
        <Button variant="contained">Create Job</Button>
      </Link>
    </div>
  )
}

export default Jobs
