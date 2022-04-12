export async function request(endpoint: string, options?: RequestInit, hasJSONResponse = true): Promise<void> {
  const response = await fetch(endpoint, options);

  try {
    if (!response.ok) throw new Error();
    return (await hasJSONResponse) ? response.json() : response.text();
  } catch (err) {
    console.error(`request() - failed (${endpoint})`);
  }
}
