import { twMerge } from 'tailwind-merge'

export const cn = twMerge

export const getRandomWidth = () => `${Math.floor(Math.random() * 71) + 30}%`
