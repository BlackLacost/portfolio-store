import { v2 } from 'cloudinary'

const cloudinary = v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const upload = async (image: string): Promise<string> => {
  const response = await cloudinary.uploader.upload(image, {
    upload_preset: process.env.CLOUDINARY_FOLDER,
  })
  return response.url
}
