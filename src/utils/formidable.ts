import type { Fields, Files } from 'formidable'
import { IncomingForm } from 'formidable'
import type { IncomingMessage } from 'http'

type ReturnForm = {
  fields: Fields
  files: Files
}

export const parseForm = (req: IncomingMessage): Promise<ReturnForm> =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({
      // keepExtensions: true,
      // allowEmptyFiles: false,
      // multiples: true,
    })
    form.parse(req, (err, fields, files) => {
      const filesWithoutZero = Object.fromEntries(
        Object.entries(files).map(([key, value]) => [
          key.replace('.0', ''),
          value,
        ])
      )
      err ? reject(err) : resolve({ fields, files: filesWithoutZero })
    })
  })
