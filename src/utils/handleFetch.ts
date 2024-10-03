export function _handleParams(url: URL, params: Record<string, string> = {}) {
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value))
  return url
}

export function _handleReponse<T>(res: any) {
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`)
  }
  return res.json() as Promise<T>
}
