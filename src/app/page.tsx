'use client'

import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import React from 'react'
import { formatDatetime } from '@/utils'
import { IProduct } from '@/types'
import { getApi } from '@/api'
import { ProductGrid } from '@/components/grids'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    const fetchApi = async () => {
      const data = await getApi<IProduct[]>('product')
      setProducts(data)
      setLoading(false)
    }

    fetchApi()
  }, [])

  return (
    <Container maxWidth="xl">
      <Typography variant="h4">Truyện Hot</Typography>

      <ProductGrid products={products} loading={loading} />

      <Divider className="pt-10 md:pt-20" />

      <Box className="pt-16 md:pt-20 grid lg:grid-cols-4 gap-10">
        <Box className="lg:col-span-1 lg:order-2">
          <Typography variant="h4">Truyện yêu thích</Typography>
          <Box className="mt-4 overflow-y-scroll max-h-[620px]">
            <Box className="w-full rounded border border-transparent bg-gray-200">
              <List>
                {!products || loading
                  ? Array.from({ length: 10 }).map((_, i) => (
                      <Skeleton key={i} variant="text" className="mx-4 mb-3 text-lg" />
                    ))
                  : products.map(prod => {
                      return (
                        <ListItem key={prod.id}>
                          <ListItemButton href={`/products/${prod.id}`} className="text-gray-500 hover:text-black">
                            <ListItemText>{prod.name}</ListItemText>
                          </ListItemButton>
                        </ListItem>
                      )
                    })}
              </List>
            </Box>
          </Box>
        </Box>
        <Box className="lg:col-span-3 lg:order-1">
          <Typography variant="h4">Truyện mới</Typography>
          <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 2 }}>
            <TableContainer sx={{ boxShadow: 'none', maxHeight: 620 }} component={Paper} className="overflow-auto">
              <Table aria-label="sticky table" stickyHeader>
                <TableHead>
                  <TableRow className="[&>*]:font-bold">
                    <TableCell>Tên</TableCell>
                    <TableCell>Tác giả</TableCell>
                    <TableCell>Ngày đăng</TableCell>
                    <TableCell>Số lượng đọc</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!products && loading
                    ? Array.from({ length: 7 }).map((_, i) => (
                        <TableRow key={i}>
                          {Array.from({ length: 4 }).map((_, i) => (
                            <TableCell key={i} component="th" scope="row">
                              <Skeleton variant="rectangular" width="100%" />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    : products
                        .sort((a, b) => b.viewCount - a.viewCount)
                        .map((prod, index) => (
                          <TableRow hover key={index} onClick={() => router.push(`/products/${prod.id}`)} role="button">
                            <TableCell>{prod.name}</TableCell>
                            <TableCell>{prod.authorName}</TableCell>
                            <TableCell>{formatDatetime(prod.createdAt)}</TableCell>
                            <TableCell>{prod.viewCount}</TableCell>
                          </TableRow>
                        ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </Container>
  )
}
