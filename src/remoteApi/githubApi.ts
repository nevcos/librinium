import Cookies from "js-cookie";

const GITHUB_ENDPOINT = "https://api.github.com";
const CLOUDFLARE_ENDPOINT = "/api/github";
export const GITHUB_CLIENT_ID = "27ea828995278ad0d743";
export const GITHUB_CODE_SEARCH_PARAM_KEY = "code";
export const GITHUB_TOKEN_COOKIE_KEY = "gh_token";

export async function getToken(code: string): Promise<any> {
  const data: any = await request(`${CLOUDFLARE_ENDPOINT}/token/${code}`);
  return data?.token;
}

export async function getClientId(): Promise<any> {
  const data: any = await request(`${CLOUDFLARE_ENDPOINT}/client`);
  return data?.id;
}

export async function getGists(): Promise<any> {
  const token = Cookies.get(GITHUB_TOKEN_COOKIE_KEY);
  const data = await request(GITHUB_ENDPOINT + "/gists", {
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${token}`
    }
  });

  return data;
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
