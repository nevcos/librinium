import Cookies from "js-cookie";
import { Gist } from "./Gist";
import { Token } from "./Token";
import { request } from "../../util/request";

const GITHUB_ENDPOINT = "https://api.github.com";
const CLOUDFLARE_ENDPOINT = "/api/github";
export const GITHUB_CLIENT_ID = "27ea828995278ad0d743";
export const GITHUB_CODE_SEARCH_PARAM_KEY = "code";
export const GITHUB_TOKEN_COOKIE_KEY = "gh_token";
export const GITHUB_AUTH_ENDPOINT = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`;

export async function getToken(code: string): Promise<string> {
  return (await request<Token>(`${CLOUDFLARE_ENDPOINT}/token/${code}`))?.token;
}

export async function getGists(): Promise<Gist[]> {
  const token = Cookies.get(GITHUB_TOKEN_COOKIE_KEY);
  return await request<Gist[]>(GITHUB_ENDPOINT + "/gists", {
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${token}`
    }
  });
}

// TODO: export async function searchGists(): Promise<any> {}
// TODO: export async function createGist(): Promise<any> {}
// TODO: export async function deleteGist(): Promise<any> {}
// TODO: export async function updateGist(): Promise<any> {}
