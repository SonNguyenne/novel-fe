'use client'
import {
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Rating from '@mui/material/Rating'
import { IChapter, IProduct, PRODUCT_STATUS } from '@/types'
import { formatCurrency, formatDatetime } from '@/utils'
import { getApi, getOne } from '@/api'
import { useAuth } from '@/hooks'
import { ProductGrid } from '@/components/grids'

export default function Page({ params }: { params: { id: number } }) {
  const router = useRouter()
  const { user } = useAuth()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setChaptersPerPage] = React.useState(5)
  // const [openPopup, setOpenPopup] = useState(false)
  // const [chapter, setChapter] = useState<IChapter>()
  const [chapters, setChapters] = useState<IChapter[]>([])
  const [product, setProduct] = useState<IProduct>()
  const [relatedProduct, setRelatedProduct] = useState<IProduct[]>([])

  React.useLayoutEffect(() => {
    getApi<IProduct[]>('product').then(res => {
      setRelatedProduct(res.filter(prod => prod.id !== +params.id))
    })

    getOne<IProduct>('product', params.id).then(res => setProduct(res))

    getApi<IChapter[]>(`product/${params.id}/chapter`).then(res => setChapters(res))
  }, [])

  const handleChapterClick = (chap: IChapter) => {
    if (!user) return router.push('/login')

    if (chap.price > 0 && user && !chap.users.includes(+user.id)) {
      // setChapter({ ...chap, productId: params?.id })
      // setOpenPopup(true)
    } else {
      router.push(`/products/${params?.id}/chapters/${chap.chapterNumber}`)
    }
  }

  // const handleClosePopup = () => {
  //   setOpenPopup(false)
  // }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setChaptersPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  if (!product) return null
  return (
    <Container maxWidth="xl">
      <Box component={'section'} className="grid lg:grid-cols-7 gap-8">
        <Box className="book-3d lg:col-span-2 relative h-[475px]">
          <img
            className="object-cover w-full h-full object-center rounded"
            src={product.image}
            alt={product.name}
            draggable={false}
          />
        </Box>
        <Box className="lg:col-span-5">
          <Box className="px-5 pb-0 lg:pt-5 rounded-md">
            <Box className="flex flex-col justify-center items-center">
              <Typography variant="h4" className="font-bold text-center">
                {product.name}
              </Typography>
              {product.averageRate && (
                <Box className="flex flex-col items-center">
                  <Rating
                    name="simple-controlled"
                    value={product.averageRate}
                    size="small"
                    // onChange={(event, newValue) => {
                    //   setValue(newValue);
                    // }}
                  />

                  <Typography variant="body2" color="textSecondary">
                    (369 lượt đánh giá)
                  </Typography>
                </Box>
              )}
            </Box>

            <Box className="mt-6 flex flex-col gap-2">
              <Box className="flex">
                <Typography width={100} color="textSecondary">
                  Author
                </Typography>
                <Typography>{product.authorName}</Typography>
              </Box>
              <Box className="flex items-center">
                <Typography width={100} color="textSecondary">
                  Status
                </Typography>
                <Chip
                  label={product.status}
                  color={product.status === PRODUCT_STATUS.DONE ? 'primary' : 'warning'}
                  size="small"
                />
              </Box>
              <Box className="flex">
                <Typography width={100} color="textSecondary">
                  View
                </Typography>
                <Typography>{product.viewCount}</Typography>
              </Box>
              <Box className="flex">
                <Typography width={100} color="textSecondary">
                  Published
                </Typography>
                <Typography>{formatDatetime(product.createdAt)}</Typography>
              </Box>
            </Box>
            {product.categories && (
              <Box className="mt-4 flex flex-wrap gap-2">
                {product.categories.map(cate => (
                  <Chip key={cate.id} label={cate.name} />
                ))}
              </Box>
            )}
            <Typography variant="body1" color="textSecondary" className="mt-6">
              {product.description}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider className="w-full mb-10 mt-10" />

      <Box component={'section'}>
        <TableContainer sx={{ boxShadow: 'none' }} component={Paper}>
          <Typography variant="h5" className="p-2">
            Chapters ({chapters.length})
          </Typography>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow className="[&>*]:font-bold">
                <TableCell>Tập</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Ngày đăng</TableCell>
                {user && <TableCell>Giá</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0 ? chapters.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : chapters).map(
                chap => (
                  <TableRow key={chap.id} role="button" hover onClick={() => handleChapterClick(chap)}>
                    <TableCell>{chap.chapterNumber}</TableCell>
                    <TableCell component="th" scope="row">
                      {chap.chapterName}
                    </TableCell>
                    <TableCell>{formatDatetime(chap.createdAt)}</TableCell>
                    {user && (
                      <TableCell
                        className={`${chap.price > 0 && user && !chap.users.includes(user.id) ? 'text-red-600' : ''}`}
                      >
                        {chap.price > 0 ? formatCurrency(chap.price) : ''}
                      </TableCell>
                    )}
                  </TableRow>
                ),
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  count={chapters.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>

      {relatedProduct && (
        <Box component={'section'} className="relative mt-20">
          <Typography variant="h5">Truyện liên quan</Typography>

          <ProductGrid products={relatedProduct} limit={6} />
        </Box>
      )}
      {/* <StripePaymentForm
            open={openPopup}
            handleClose={handleClosePopup}
            chapter={chapter}
          /> */}
    </Container>
  )
}
