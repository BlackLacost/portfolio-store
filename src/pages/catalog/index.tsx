import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { Category } from '@prisma/client'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { prisma } from '../../../prisma'

type Props = {
  categories: Category[]
}

const CatalogPage: NextPage<Props> = ({ categories }) => {
  return (
    <>
      <Head>
        <title>Категории товаров</title>
        <meta
          name="description"
          content="Каталог товаров в магазине Portfolio Store"
        />
      </Head>
      <Stack gap={3}>
        <Typography variant="h3" component="h1">
          Категории товаров
        </Typography>

        <Grid container spacing={2}>
          {categories.map((category) => (
            <Fragment key={category.id}>
              <Grid item md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" component="h2">
                      {category.name}
                    </Typography>
                    <Typography>{category.slug}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </Stack>
    </>
  )
}

export default CatalogPage

export const getStaticProps: GetStaticProps = async (context) => {
  const categories = await prisma.category.findMany()

  return {
    props: { categories },
    revalidate: 60,
  }
}
