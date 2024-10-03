import { Box, Link, Skeleton, Typography } from '@mui/material'
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Star } from '@mui/icons-material'
import { IProduct } from '@/types'

export interface IProductGrid {
  products: IProduct[]
  limit?: number
  loading?: boolean
}

export const ProductGrid = ({ products, limit = 12, loading }: IProductGrid) => {
  return (
    <Box className="mt-4 grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
      {!products || loading
        ? Array.from({ length: limit }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" width="100%" height={270} />
          ))
        : products.slice(0, limit).map(prod => {
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
                      <Typography>{prod.viewCount}</Typography>
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
  )
}
