import { format, parse } from 'date-fns'

export const formatDatetime = (value: string) => {
  if (!value) return

  const date = parse(value, "yyyy-MM-dd'T'HH:mm:ss.SSSX", new Date())
  const formatDate = 'dd/MM/yyyy'
  const formatTime = ''
  return format(new Date(date), `${formatDate} ${formatTime}`)
}
