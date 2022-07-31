import { yupResolver } from '@hookform/resolvers/yup'
import {
  Alert,
  Button,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { NextPage } from 'next'
import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { createCategorySchema } from '../features/Products/Categories/create-category.schema'

type Props = {}

const AdminPage: NextPage<Props> = (props) => {
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const mutation = useMutation(async (formData) => {
    return axios.post('/api/categories', formData)
  })

  const categoryMethods = useForm({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(createCategorySchema),
  })

  const { handleSubmit, reset } = categoryMethods

  const onSubmit = async (data: any) => {
    setOpen(true)
    try {
      await mutation.mutateAsync(data)
      reset()
    } catch (err: any) {
      setErrors(err.response.data.message)
    }
  }

  return (
    <>
      <Stack spacing={3}>
        <Typography variant="h1" component="h1">
          Админка
        </Typography>
        <Paper>
          <FormProvider {...categoryMethods}>
            <Form noValidate>
              <Typography variant="h2" component="h2">
                Создать категорию
              </Typography>
              <Controller
                name="name"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    required
                    {...field}
                    helperText={error?.message}
                    error={Boolean(error)}
                    label="Название товара"
                  />
                )}
              />
              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                disabled={mutation.isLoading}
                sx={{ alignSelf: 'end' }}
              >
                Создать
              </Button>
            </Form>
          </FormProvider>
        </Paper>
      </Stack>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        {mutation.isLoading ? (
          <Alert severity="info">Loading</Alert>
        ) : mutation.isError ? (
          <Alert severity="error">
            {errors.map((error) => (
              <Typography key={error}>{error}</Typography>
            ))}
          </Alert>
        ) : (
          <Alert severity="success">Success</Alert>
        )}
      </Snackbar>
    </>
  )
}

export default AdminPage

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  padding: 20,
  gap: 20,
})
