import { Paper, Stack, Typography } from '@mui/material'
import { NextPage } from 'next'
import CreateCategoryForm from '../features/Products/Categories/CreateCategoryForm'

type Props = {}

const AdminPage: NextPage<Props> = (props) => {
  return (
    <>
      <Stack spacing={3}>
        <Typography variant="h1" component="h1">
          Админка
        </Typography>
        <Paper>
          <CreateCategoryForm />
        </Paper>
      </Stack>
    </>
  )
}

export default AdminPage
