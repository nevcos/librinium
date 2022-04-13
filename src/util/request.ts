export async function request<T>(
  endpoint: string,
  options?: RequestInit,
  hasJSONResponse = true
): Promise<T> {
  const response = await fetch(endpoint, options);
  if (!response.ok) throw new Error();
  return await (hasJSONResponse ? response.json() : response.text());
}
