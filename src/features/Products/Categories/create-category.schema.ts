import * as yup from 'yup'

export const createCategorySchema = yup
  .object({
    name: yup
      .string()
      .min(3, 'Название товара не менее 3 символов')
      .max(50, 'Название товара не больше 50 символов')
      .required(),
  })
  .required()
