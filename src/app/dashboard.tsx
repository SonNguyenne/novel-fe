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

  if (loading) return 'Loading...'
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <Paper elevation={6} sx={{ borderRadius: 2 }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h4">🔥 Hot</Typography>
              <ProductGrid products={products} loading={loading} limit={6} />
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Paper elevation={6} sx={{ borderRadius: 2, height: '100%' }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h4">Tin tức</Typography>
            </Box>

            <Box sx={{ overflowY: 'auto' }}>
              {loading ? (
                <Stack spacing={2} sx={{ height: '360px', p: 2 }}>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <Skeleton variant="text" width="50px" height="20px" />
                      <Skeleton variant="text" width="100%" height="20px" />
                    </Stack>
                  ))}
                </Stack>
              ) : (
                <Stack spacing={2} sx={{ height: '360px', p: 2 }}>
                  <Stack role="button" direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'20/10'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tuyển dụng Dịch giả/Editor </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={'11/11'} color="info" size="small" sx={{ width: '50px' }} />
                    <Typography color="textSecondary">Tiết Kiệm Sinh Lời đến 24%/năm</Typography>
                  </Stack>
                </Stack>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Paper elevation={6} sx={{ borderRadius: 2 }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h4">Thế loại</Typography>
            </Box>

            <Box sx={{ overflowY: 'auto', p: 2 }}>
              <Grid container spacing={1} sx={{ height: 620 }}>
                {!categories || loading
                  ? Array.from({ length: 20 }).map((_, i) => (
                      <Grid size={6} key={i}>
                        <Skeleton variant="text" />
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
                            <Typography color="textSecondary">{cate.name}</Typography>
                          </Link>
                        </Grid>
                      )
                    })}
              </Grid>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 9 }}>
          <Paper elevation={6} sx={{ borderRadius: 2 }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h4">Chương mới</Typography>
            </Box>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer component={Paper} sx={{ height: 620 + 16 + 16 }}>
                <Table aria-label="sticky table" stickyHeader>
                  <TableHead>
                    <TableRow className="[&>*]:font-bold">
                      <TableCell>Tên</TableCell>
                      <TableCell>Chương</TableCell>
                      <TableCell>Tác giả</TableCell>
                      <TableCell>Ngày đăng</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!products || loading
                      ? Array.from({ length: 15 }).map((_, i) => (
                          <TableRow key={i}>
                            {Array.from({ length: 4 }).map((_, i) => (
                              <TableCell key={i} component="th" scope="row">
                                <Skeleton variant="rounded" width="100%" />
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
                                <Chip label={prod.chapterCount} color="info" />
                              </TableCell>
                              <TableCell>{prod.authorName}</TableCell>
                              <TableCell>{formatTimeAgo(prod.updatedAt)}</TableCell>
                            </TableRow>
                          ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Paper>
        </Grid>

        <Grid size={12}>
          <Paper elevation={6} sx={{ borderRadius: 2 }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h4">Truyện đã hoàn thành</Typography>
              <ProductGrid products={doneProducts} loading={loading} limit={6} showInfo />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
