import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Paper, Snackbar, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import FileUpload from '../../../components/FileUpload'
import { Form } from '../../../components/Form'
import TextInput from '../../../components/TextInput'
import {
  createCategorySchema,
  CreateCategoryType,
} from './create-category.schema'

type Props = {}

const CreateCategoryForm = ({}: Props) => {
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const mutation = useMutation(async (formData: CreateCategoryType) => {
    return axios.post('/api/categories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  })

  const categoryMethods = useForm<CreateCategoryType>({
    defaultValues: {
      name: '',
      image: [],
    },
    resolver: yupResolver(createCategorySchema),
    mode: 'onBlur',
  })

  const { handleSubmit, reset } = categoryMethods

  const onSubmit = async (data: CreateCategoryType) => {
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
      <Paper>
        <FormProvider {...categoryMethods}>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Typography variant="h2" component="h2">
              Создать категорию
            </Typography>
            <TextInput required label="Название товара" name="name" />
            <FileUpload
              label="Перенесите картинку сюда или нажмите, чтобы выбрать файл"
              name="image"
              accept={{ 'image/*': [] }}
            />

            <Button
              type="submit"
              disabled={mutation.isLoading}
              sx={{ alignSelf: 'end' }}
            >
              Создать
            </Button>
          </Form>
        </FormProvider>
      </Paper>
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
            {errors.length &&
              errors.map((error) => (
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
