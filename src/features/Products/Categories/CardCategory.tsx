import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import Image from 'next/image'

type Props = {
  category: {
    name: string
    image: string
  }
}

function CardCategory({ category }: Props) {
  return (
    <Card>
      <CardMedia
        component={() => (
          <Box py={2}>
            <Image
              src={category.image}
              alt={category.name}
              height="200"
              width="300"
              objectFit="contain"
              layout="responsive"
            />
          </Box>
        )}
      />
      <CardContent>
        <Typography textAlign="center" variant="h5" component="h2">
          {category.name}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardCategory
