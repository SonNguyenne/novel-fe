export function _handleParams(url: URL, params: Record<string, string> = {}) {
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value))
  return url
}

export async function _handleReponse<T>(res: any) {
  const json = await res.json()

  if (!res.ok) throw json

  return json as Promise<T>
}
