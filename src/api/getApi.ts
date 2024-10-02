const baseUrl = process.env.API_BASE_URL

export async function getApi<T>(endpoint: string, headers: Record<string, string> = {}) {
  const response = await fetch(`${baseUrl}/${endpoint}`, { headers })
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`)
  }
  return response.json() as Promise<T>
}

export async function getOne<T>(
  endpoint: string,
  id: number | string,
  headers: Record<string, string> = {},
): Promise<T> {
  const response = await fetch(`${baseUrl}/${endpoint}/${id}`, { headers })
  if (!response.ok) {
    throw new Error(`Failed to fetch item: ${response.statusText}`)
  }
  return response.json() as Promise<T>
}
