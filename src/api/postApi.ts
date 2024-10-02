const baseUrl = process.env.API_BASE_URL

export async function postApi<T, U>(endpoint: string, data: U, headers: Record<string, string> = {}): Promise<T> {
  const response = await fetch(`${baseUrl}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  })

  const json = await response.json()
  if (!response.ok) {
    throw new Error(json.message)
  }
  return json as Promise<T>
}

export async function postOne<T, U>(
  endpoint: string,
  id: number | string,
  data: U,
  headers: Record<string, string> = {},
): Promise<T> {
  const response = await fetch(`${baseUrl}/${endpoint}/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error(`Failed to post data: ${response.statusText}`)
  }
  return response.json() as Promise<T>
}
