const baseUrl = process.env.API_BASE_URL

export async function patchOne<T, U>(
  endpoint: string,
  id: number | string,
  data: U,
  headers: Record<string, string> = {},
): Promise<T> {
  const response = await fetch(`${baseUrl}/${endpoint}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error(`Failed to patch item: ${response.statusText}`)
  }
  return response.json() as Promise<T>
}
