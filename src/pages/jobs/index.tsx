import { Button } from '@mui/material'
import { DataGrid, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { fetchApi } from 'client'
import Link from 'next/link'

const Jobs = () => {
  const jobsQuery = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => await fetchApi({ url: '/job', method: 'GET' }),
  })
  console.log({ jobsQuery })
  
  if (jobsQuery.isLoading) return <div>Loading...</div>
  if (jobsQuery.isError) return <div>Error...</div>
  return (
    <div>
      <h1>Jobs</h1>
      <Link href="/jobs/create">
        <Button variant="contained">Create Job</Button>
      </Link>
      <DataGrid 
        rows={jobsQuery.data || []}
        columns={[
          { field: 'title', headerName: 'Title', flex: 1 },
          { field: 'description', headerName: 'Description', flex: 1 },
          { field: 'locationType', headerName: 'Location Type', flex: 1 },
          { field: 'location.country', headerName: 'Country', flex: 1, 
            renderCell: (params: GridRenderCellParams) => <strong>{params.row.location.country}</strong> },
          { field: 'applicants', headerName: 'Applicants', 
            valueGetter: (params: GridValueGetterParams) => params.row.applicants.length,
            flex: 1,
          },
        ]}
        autoHeight
        pageSizeOptions={[5, 10, 20]}
        
      />
    </div>
  )
}

export default Jobs
