import type { NextApiRequest, NextApiResponse } from 'next'
import { slugify } from 'transliteration'
import { ValidationError } from 'yup'
import { createCategorySchema } from '../../features/Products/Categories/create-category.schema'
import { prisma } from '../../prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const categories = await prisma.category.findMany()
      return res.status(200).json(categories)
    }

    if (req.method === 'POST') {
      const { name } = await createCategorySchema.validate(req.body)

      const existingCategory = await prisma.category.findUnique({
        where: { name },
      })
      if (existingCategory) {
        return res
          .status(422)
          .json({ message: 'Такая категория уже существует' })
      }

      const category = await prisma.category.create({
        data: { name, slug: slugify(name) },
      })
      return res.status(201).json(category)
    }

    res.setHeader('Allow', 'GET, POST')
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(error)
      return res.status(422).json({ message: error.errors })
    }
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
