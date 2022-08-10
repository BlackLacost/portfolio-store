import { TextField, TextFieldProps } from '@mui/material'
import { Controller } from 'react-hook-form'

export default function TextInput({
  name = '',
  label,
  ...props
}: TextFieldProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          helperText={error?.message}
          error={Boolean(error)}
          label={label}
          {...props}
        />
      )}
    />
  )
}
