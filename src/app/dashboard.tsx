'use client'

import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import React from 'react'
import { _handleReponse, formatTimeAgo } from '@/lib/utils'
import { ProductGrid } from '@/components/grids'
import Grid from '@mui/material/Grid2'
import Link from 'next/link'
import { Container } from '@/components'

export default function Dashboard({ products, categories, doneProducts }: any) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [color, setColor] = useState('#fff')

  useEffect(() => {
    if (products.length > 0 && categories.length > 0) {
      setLoading(false)
    }
  }, [products, categories, doneProducts])

  return (
    <Container>
      <Stack spacing={10}>
        <Box className="md:mt-6">
          <Typography variant="h4">Truyện Hot</Typography>
          <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => setColor('red')}>
            đổi màu đỏ
          </Button>
          <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => setColor('blue')}>
            đổi màu xanh
          </Button>
          <div
            style={{
              width: 600,
              height: 300,
              backgroundColor: color,
            }}
          >
            màu
          </div>
          <ProductGrid products={products} loading={loading} />
        </Box>

        <Divider className="" />

        <Box className="space-y-16 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-10">
          <Box className="lg:col-span-1 lg:order-2">
            <Typography variant="h4">Thế loại</Typography>

            <Box className="mt-4 overflow-y-auto max-h-[620px]">
              <Box className="w-full rounded border border-transparent">
                <Grid container spacing={1}>
                  {!categories || loading
                    ? Array.from({ length: 20 }).map((_, i) => (
                        <Grid size={6} key={i}>
                          <Skeleton variant="text" className="mx-4 !mb-3 text-lg" />
                        </Grid>
                      ))
                    : categories.map(cate => {
                        return (
                          <Grid size={6} key={cate.id}>
                            <Link
                              className="hover:underline underline-offset-4"
                              href={`/category/${cate.id}`}
                              onClick={() => router.push(`/category/${cate.id}`)}
                            >
                              <Typography>{cate.name}</Typography>
                            </Link>
                          </Grid>
                        )
                      })}
                </Grid>
              </Box>
            </Box>
          </Box>

          <Box className="lg:col-span-3 lg:order-1">
            <Typography variant="h4">Chương mới</Typography>

            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 2 }}>
              <TableContainer sx={{ boxShadow: 'none', maxHeight: 620 }} component={Paper} className="overflow-auto">
                <Table aria-label="sticky table" stickyHeader>
                  <TableHead>
                    <TableRow className="[&>*]:font-bold">
                      <TableCell>Tên</TableCell>
                      <TableCell>Chương</TableCell>
                      <TableCell>Tác giả</TableCell>
                      <TableCell>View</TableCell>
                      <TableCell>Ngày đăng</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!products || loading
                      ? Array.from({ length: 8 }).map((_, i) => (
                          <TableRow key={i}>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <TableCell key={i} component="th" scope="row">
                                <Skeleton variant="rectangular" width="100%" />
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      : products
                          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                          .map((prod, index) => (
                            <TableRow
                              hover
                              key={index}
                              onClick={() => router.push(`/product/${prod.id}`)}
                              role="button"
                            >
                              <TableCell>{prod.name}</TableCell>
                              <TableCell>
                                <Chip label={prod.chapterCount} color="primary" />
                              </TableCell>
                              <TableCell>{prod.authorName}</TableCell>
                              <TableCell>{prod.viewCount}</TableCell>
                              <TableCell>{formatTimeAgo(prod.updatedAt)}</TableCell>
                            </TableRow>
                          ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </Box>

        {doneProducts.length > 0 && (
          <Box className="md:mt-6">
            <Typography variant="h4">Truyện đã hoàn thành</Typography>

            <ProductGrid products={doneProducts} loading={loading} limit={6} showInfo />
          </Box>
        )}
      </Stack>
    </Container>
  )
}
