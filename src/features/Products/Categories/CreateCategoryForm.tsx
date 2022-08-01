import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Snackbar, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Form } from '../../../components/Form'
import TextInput from '../../../components/TextInput'
import { createCategorySchema } from './create-category.schema'

type Props = {}

const CreateCategoryForm = ({}: Props) => {
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
      <FormProvider {...categoryMethods}>
        <Form noValidate>
          <Typography variant="h2" component="h2">
            Создать категорию
          </Typography>
          <TextInput required label="Название товара" name="name" />
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

export default CreateCategoryForm
