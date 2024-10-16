import {
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { _handleReponse, formatTimeAgo } from '@/lib/utils'
import { ICategory, IProduct, PRODUCT_STATUS } from '@/types'
import { ProductGrid } from '@/components/grids'
import Grid from '@mui/material/Grid2'
import Link from 'next/link'
import { Container } from '@/components'
import Dashboard from './dashboard'

export default async function Home() {
  const products: IProduct[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`).then(res => res.json())
  const categories: ICategory[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`).then(res => res.json())

  const doneProducts = products?.filter(d => d.status === PRODUCT_STATUS.DONE)

  return (
    <Dashboard products={products} categories={categories} doneProducts={doneProducts} />
    // <Container>
    //   <Stack spacing={10}>
    //     <Box className="md:mt-6">
    //       <Typography variant="h4">Truyện Hot</Typography>
    //       <ProductGrid products={products} loading={false} />
    //     </Box>

    //     <Divider className="" />

    //     <Box className="space-y-16 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-10">
    //       <Box className="lg:col-span-1 lg:order-2">
    //         <Typography variant="h4">Thể loại</Typography>

    //         <Box className="mt-4 overflow-y-auto max-h-[620px]">
    //           <Box className="w-full rounded border border-transparent">
    //             <Grid container spacing={1}>
    //               {categories.map(cate => (
    //                 <Grid size={6} key={cate.id}>
    //                   <Link className="hover:underline underline-offset-4" href={`/category/${cate.id}`}>
    //                     <Typography>{cate.name}</Typography>
    //                   </Link>
    //                 </Grid>
    //               ))}
    //             </Grid>
    //           </Box>
    //         </Box>
    //       </Box>

    //       <Box className="lg:col-span-3 lg:order-1">
    //         <Typography variant="h4">Chương mới</Typography>

    //         <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 2 }}>
    //           <TableContainer sx={{ boxShadow: 'none', maxHeight: 620 }} component={Paper} className="overflow-auto">
    //             <Table aria-label="sticky table" stickyHeader>
    //               <TableHead>
    //                 <TableRow className="[&>*]:font-bold">
    //                   <TableCell>Tên</TableCell>
    //                   <TableCell>Chương</TableCell>
    //                   <TableCell>Tác giả</TableCell>
    //                   <TableCell>View</TableCell>
    //                   <TableCell>Ngày đăng</TableCell>
    //                 </TableRow>
    //               </TableHead>
    //               <TableBody>
    //                 {products
    //                   .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    //                   .map((prod, index) => (
    //                     <TableRow hover key={index} role="button">
    //                       <TableCell>{prod.name}</TableCell>
    //                       <TableCell>
    //                         <Chip label={prod.chapterCount} color="primary" />
    //                       </TableCell>
    //                       <TableCell>{prod.authorName}</TableCell>
    //                       <TableCell>{prod.viewCount}</TableCell>
    //                       <TableCell>{formatTimeAgo(prod.updatedAt)}</TableCell>
    //                     </TableRow>
    //                   ))}
    //               </TableBody>
    //             </Table>
    //           </TableContainer>
    //         </Paper>
    //       </Box>
    //     </Box>

    //     {doneProducts.length > 0 && (
    //       <Box className="md:mt-6">
    //         <Typography variant="h4">Truyện đã hoàn thành</Typography>

    //         <ProductGrid products={doneProducts} loading={false} limit={6} showInfo />
    //       </Box>
    //     )}
    //   </Stack>
    // </Container>
  )
}
