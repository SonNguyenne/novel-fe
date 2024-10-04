import { _handleParams, _handleReponse } from '@/lib/utils'

export async function getApi<T>(
  endpoint: string,
  params: Record<string, string> = {},
  headers: Record<string, string> = { 'Content-Type': 'application/json' },
): Promise<T> {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`
  const url = _handleParams(baseUrl, params)

  return _handleReponse(await fetch(url, { headers }))
}

export async function getOne<T>(
  endpoint: string,
  id: number | string,
  params: Record<string, string> = {},
  headers: Record<string, string> = { 'Content-Type': 'application/json' },
): Promise<T> {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${id}`
  const url = _handleParams(baseUrl, params)

  return _handleReponse(await fetch(url, { headers }))
}

export async function postApi<T, U>(
  endpoint: string,
  data: U,
  params: Record<string, string> = {},
  headers: Record<string, string> = { 'Content-Type': 'application/json' },
): Promise<T> {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`
  const url = _handleParams(baseUrl, params)

  return _handleReponse(
    await fetch(url, {
      headers,
      method: 'POST',
      body: JSON.stringify(data),
    }),
  )
}

export async function postOne<T, U>(
  endpoint: string,
  id: number | string,
  data: U,
  params: Record<string, string> = {},
  headers: Record<string, string> = { 'Content-Type': 'application/json' },
): Promise<T> {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${id}`
  const url = _handleParams(baseUrl, params)

  return _handleReponse(
    await fetch(url, {
      headers,
      method: 'POST',
      body: JSON.stringify(data),
    }),
  )
}

export async function patchApi<T, U>(
  endpoint: string,
  data: U,
  params: Record<string, string> = {},
  headers: Record<string, string> = { 'Content-Type': 'application/json' },
): Promise<T> {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`
  const url = _handleParams(baseUrl, params)

  return _handleReponse(
    await fetch(url, {
      headers,
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  )
}

export async function patchOne<T, U>(
  endpoint: string,
  id: number | string,
  data: U,
  params: Record<string, string> = {},
  headers: Record<string, string> = { 'Content-Type': 'application/json' },
): Promise<T> {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${id}`
  const url = _handleParams(baseUrl, params)

  return _handleReponse(
    await fetch(url, {
      headers,
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  )
}

export async function deleteApi<T>(
  endpoint: string,
  params: Record<string, string> = {},
  headers: Record<string, string> = { 'Content-Type': 'application/json' },
): Promise<T> {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`
  const url = _handleParams(baseUrl, params)

  return _handleReponse(await fetch(url, { headers, method: 'DELETE' }))
}

export async function deleteOne<T>(
  endpoint: string,
  id: number | string,
  params: Record<string, string> = {},
  headers: Record<string, string> = { 'Content-Type': 'application/json' },
): Promise<T> {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${id}`
  const url = _handleParams(baseUrl, params)

  return _handleReponse(await fetch(url, { headers, method: 'DELETE' }))
}
