import type { NextApiRequest, NextApiResponse } from 'next'
import { slugify } from 'transliteration'
import { ValidationError } from 'yup'
import { prisma } from '../../../prisma'
import { createCategorySchema } from '../../features/Products/Categories/create-category.schema'
import { upload } from '../../utils/cloudinary.services'
import { parseForm } from '../../utils/formidable'

export const config = {
  api: {
    bodyParser: false,
  },
}

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
      const { files, fields } = await parseForm(req)
      const { name, image } = await createCategorySchema.validate({
        name: fields.name[0],
        image: files.image,
      })
      const imageUrl = await upload(image[0].filepath)

      const existingCategory = await prisma.category.findUnique({
        where: { name },
      })
      if (existingCategory) {
        return res
          .status(422)
          .json({ message: 'Такая категория уже существует' })
      }

      const category = await prisma.category.create({
        data: { name, slug: slugify(name), image: imageUrl },
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
