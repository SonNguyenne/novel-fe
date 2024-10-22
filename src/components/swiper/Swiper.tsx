import { FC } from 'react'
import { Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react'
import { IProduct } from '@/types'
import Image from 'next/image'
import { Box, Skeleton, Typography } from '@mui/material'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import './swiper.css'
import Link from 'next/link'

export interface ISwiperProps {
  items: IProduct[]
  loading?: boolean
  slidesPerView?: number
}

export const Swiper: FC<ISwiperProps> = ({ items, loading, slidesPerView = 5 }) => {
  return (
    <SwiperReact
      modules={[Autoplay, Pagination, Scrollbar, A11y]}
      slidesPerView={3}
      breakpoints={{
        600: {
          slidesPerView: 4,
        },
        900: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: slidesPerView,
        },
      }}
      spaceBetween={10}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{ clickable: true }}
    >
      {!items || loading
        ? Array.from({ length: slidesPerView }).map((_, i) => (
            <SwiperSlide key={i}>
              <Box
                sx={{
                  height: {
                    xs: 180,
                    md: 270,
                    xl: 360,
                  },
                }}
              >
                <Skeleton variant="rounded" width="100%" height="100%" />
              </Box>
            </SwiperSlide>
          ))
        : items.map((item: IProduct) => (
            <SwiperSlide key={item.id}>
              <Link href={`/product/${item.id}`} className="relative group overflow-hidden">
                <Box
                  sx={{
                    height: {
                      xs: 180,
                      md: 270,
                      xl: 360,
                    },
                  }}
                >
                  <Image src={item.image} alt={item.name} fill className="object-cover w-full h-full object-center" />
                </Box>
                <Box className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full p-2 text-center backdrop-blur-sm group-hover:py-5 group-hover:backdrop-blur-lg transition-all">
                  <Typography variant="body1" className="text-[#f0f0f0]">
                    {item.name}
                  </Typography>
                </Box>
              </Link>
            </SwiperSlide>
          ))}
    </SwiperReact>
  )
}
