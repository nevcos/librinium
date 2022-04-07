const ENDPOINT_GITHUB = "https://api.github.com";
const ENDPOINT_CLOUDFLARE = "/api/github";
const LS_GH_TOKEN_KEY = "gh_token";

export async function getToken(code: string): Promise<any> {
  const data: any = await request(`${ENDPOINT_CLOUDFLARE}/token/${code}`);
  return data?.token;
}

export async function getClientId(): Promise<any> {
  const data: any = await request(`${ENDPOINT_CLOUDFLARE}/client`);
  return data?.id;
}

export async function getGists(): Promise<any> {
  const token = getTokenFromLS();
  const data = await request(ENDPOINT_GITHUB + "/gists", {
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${token}`
    }
  });

  return data;
}

function getTokenFromLS(): string | null {
  return localStorage.getItem(LS_GH_TOKEN_KEY);
}

async function request(endpoint: string, options?: RequestInit): Promise<void> {
  const response = await fetch(endpoint, options);

  try {
    if (!response.ok) throw new Error();
    return await response.json();
  } catch (err) {
    console.error(`request() - failed (${endpoint})`);
  }
}
