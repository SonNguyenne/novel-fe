export function _handleParams(url: string, params: Record<string, string> = {}) {
  const queryParams: Record<string, string> = { ...params }
  const queryString = new URLSearchParams(queryParams).toString()

  return queryString ? `${url}?${queryString}` : url
}

export async function _handleReponse<T>(res: Response) {
  const json = await res.json()

  if (!res.ok) throw json

  return json as Promise<T>
}
