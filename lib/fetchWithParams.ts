export function fetchWithParams(
  url: string,
  params?: Record<string, unknown>,
  options?: RequestInit
) {
  const fullUrl = new URL(url);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        fullUrl.searchParams.append(key, String(value));
      }
    });
  }

  return fetch(fullUrl.toString(), options);
}
