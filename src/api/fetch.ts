import { _handleParams, _handleReponse } from '@/utils'

export async function getApi<T>(
  endpoint: string,
  params: Record<string, string> = {},
  headers: Record<string, string> = {},
): Promise<T> {
  const baseUrl = new URL(`${process.env.API_BASE_URL}/${endpoint}`)
  const url = _handleParams(baseUrl, params)

  return _handleReponse(await fetch(url.toString(), { headers: { ...headers, 'Content-Type': 'application/json' } }))
}

export async function getOne<T>(
  endpoint: string,
  id: number | string,
  params: Record<string, string> = {},
  headers: Record<string, string> = {},
): Promise<T> {
  const baseUrl = new URL(`${process.env.API_BASE_URL}/${endpoint}/${id}`)
  const url = _handleParams(baseUrl, params)

  return _handleReponse(await fetch(url.toString(), { headers: { ...headers, 'Content-Type': 'application/json' } }))
}

export async function postApi<T, U>(
  endpoint: string,
  data: U,
  params: Record<string, string> = {},
  headers: Record<string, string> = {},
): Promise<T> {
  const baseUrl = new URL(`${process.env.API_BASE_URL}/${endpoint}`)
  const url = _handleParams(baseUrl, params)

  return _handleReponse(
    await fetch(url.toString(), {
      headers: { ...headers, 'Content-Type': 'application/json' },
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
  headers: Record<string, string> = {},
): Promise<T> {
  const baseUrl = new URL(`${process.env.API_BASE_URL}/${endpoint}/${id}`)
  const url = _handleParams(baseUrl, params)

  return _handleReponse(
    await fetch(url.toString(), {
      headers: { ...headers, 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(data),
    }),
  )
}

export async function patchOne<T, U>(
  endpoint: string,
  id: number | string,
  data: U,
  params: Record<string, string> = {},
  headers: Record<string, string> = {},
): Promise<T> {
  const baseUrl = new URL(`${process.env.API_BASE_URL}/${endpoint}/${id}`)
  const url = _handleParams(baseUrl, params)

  return _handleReponse(
    await fetch(url.toString(), {
      headers: { ...headers, 'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  )
}

export async function deleteOne<T>(
  endpoint: string,
  id: number | string,
  params: Record<string, string> = {},
  headers: Record<string, string> = {},
): Promise<T> {
  const baseUrl = new URL(`${process.env.API_BASE_URL}/${endpoint}/${id}`)
  const url = _handleParams(baseUrl, params)

  return _handleReponse(
    await fetch(url.toString(), { headers: { ...headers, 'Content-Type': 'application/json' }, method: 'DELETE' }),
  )
}
