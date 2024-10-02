const baseUrl = process.env.API_BASE_URL

export async function deleteOne<T>(
  endpoint: string,
  id: number | string,
  headers: Record<string, string> = {},
): Promise<T> {
  const response = await fetch(`${baseUrl}/${endpoint}/${id}`, {
    method: 'DELETE',
    headers,
  })
  if (!response.ok) {
    throw new Error(`Failed to delete item: ${response.statusText}`)
  }
  return response.json() as Promise<T>
}
