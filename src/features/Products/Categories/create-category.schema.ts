import * as yup from 'yup'

export const createCategorySchema = yup
  .object({
    name: yup
      .string()
      .min(3, 'Название товара не менее 3 символов')
      .max(50, 'Название товара не больше 50 символов')
      .required(),
    image: yup
      .mixed()
      .test({
        message: 'Изображение картинки обязательно',
        test: (file) => {
          return file.length > 0
        },
      })
      .test({
        message: 'Не больше одной картинки',
        test: (file) => {
          return file.length === 1
        },
      })
      .test({
        message: 'Не больше 5 МБ',
        test: (file) => {
          return file.length && file[0].size <= 5 * 1024 * 1024
        },
      }),
  })
  .required()

export type CreateCategoryType = yup.InferType<typeof createCategorySchema>
