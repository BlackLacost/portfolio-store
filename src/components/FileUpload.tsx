import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import type { Accept } from 'react-dropzone'
import Dropzone from 'react-dropzone'
import { Controller } from 'react-hook-form'

type Props = {
  name: string
  label: string
  accept?: Accept
}

const FileUpload = ({ name, label, accept }: Props) => {
  return (
    <Controller
      name={name}
      defaultValue={[]}
      render={({ field, formState: { errors } }) => (
        <>
          <Dropzone accept={accept} onDrop={field.onChange}>
            {({ getRootProps, getInputProps }) => (
              <>
                <Paper
                  variant="outlined"
                  {...getRootProps()}
                  sx={{
                    padding: 1,
                    cursor: 'pointer',
                    color: '#333',
                    backgroundColor: '#eee',
                  }}
                >
                  <input {...getInputProps()} />
                  <p>{label}</p>
                </Paper>
                {!!errors.image && (
                  <Typography color="red" variant="body2">
                    {/* @ts-ignore */}
                    {errors.image.message}
                  </Typography>
                )}
                <List>
                  {field.value.map((file: File, index: number) => (
                    <ListItem key={index}>
                      <Box
                        height={160}
                        pr={4}
                        alt={file.name}
                        src={URL.createObjectURL(file)}
                        component="img"
                      />
                      <ListItemText
                        primary={file.name}
                        secondary={`${Math.round(file.size / 1024)} Кб`}
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Dropzone>
        </>
      )}
    />
  )
}

export default FileUpload
