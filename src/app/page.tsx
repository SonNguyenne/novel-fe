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
import Link from 'next/link'
import { useEffect, useState } from 'react'
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Star } from '@mui/icons-material'
import { formatDatetime } from '@/utils'
import { IProduct } from './types'
import { getApi } from '@/api'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    const fetch = async () => {
      const data = await getApi<IProduct[]>('product')
      setProducts(data)
      setLoading(false)
    }

    fetch()
  }, [])

  return (
    <Container maxWidth="xl">
      <Typography variant="h4">Truyện Hot</Typography>
      <Box className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {!products || loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} variant="rectangular" width="100%" height={270} />
            ))
          : products.slice(0, 12).map(prod => {
              return (
                <Box key={prod.id}>
                  <Link href={`/product/${prod.id}`}>
                    <Box className="overflow-hidden rounded h-[270px]">
                      <img
                        className="hover:scale-110 transition-all object-cover w-full h-full object-center"
                        src={prod.image}
                        alt={prod.name}
                        loading="lazy"
                      />
                    </Box>
                  </Link>

                  <Box className="w-full">
                    <Box className="py-2 flex flex-wrap justify-between items-center gap-2">
                      <Typography className="font-semibold">{prod.name}</Typography>
                      <Typography className="text-gray-400">{prod.authorName}</Typography>
                    </Box>
                    <Box className="text-gray-400 flex flex-wrap justify-between items-center gap-2">
                      <Typography>{prod.chapterCount} chapters</Typography>
                      <Box className="text-gray-400 flex items-center space-x-1">
                        <Typography>{prod.averageRate}</Typography>
                        <VisibilityIcon fontSize="small" />
                        <Typography>{prod.averageRate}</Typography>
                        <Star fontSize="small" />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )
            })}
      </Box>

      <Divider className="mt-10 mb-16 md:my-20" />

      <Box className="grid lg:grid-cols-4 gap-10">
        <Box className="lg:col-span-1 lg:order-2">
          <Typography variant="h4">Truyện yêu thích</Typography>
          <Box className="mt-4 overflow-y-scroll max-h-[620px]">
            <Box className="w-full rounded border border-transparent bg-gray-200">
              <List>
                {!products || loading
                  ? Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} variant="text" sx={{ fontSize: 12 }} />)
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
                  {!products || loading
                    ? Array.from({ length: 7 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell component="th" scope="row">
                            <Skeleton variant="rectangular" width="100%" />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Skeleton variant="rectangular" width="100%" />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Skeleton variant="rectangular" width="100%" />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Skeleton variant="rectangular" width="100%" />
                          </TableCell>
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
