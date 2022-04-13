import Cookies from "js-cookie";
import { Gist } from "./Gist";

const GITHUB_ENDPOINT = "https://api.github.com";
const CLOUDFLARE_ENDPOINT = "/api/github";
export const GITHUB_CLIENT_ID = "27ea828995278ad0d743";
export const GITHUB_CODE_SEARCH_PARAM_KEY = "code";
export const GITHUB_TOKEN_COOKIE_KEY = "gh_token";
export const GITHUB_AUTH_ENDPOINT = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`;

export async function getToken(code: string): Promise<string> {
  const response = await fetch(`${CLOUDFLARE_ENDPOINT}/token/${code}`);
  if (!response.ok) throw new Error();
  return (await response.json())?.token;
}

export async function getGists(): Promise<Gist[]> {
  const token = Cookies.get(GITHUB_TOKEN_COOKIE_KEY);
  const response = await fetch(GITHUB_ENDPOINT + "/gists", {
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${token}`
    }
  });
  if (!response.ok) throw new Error();
  return await response.json();
}

export async function deleteGist(id: string): Promise<void> {
  const token = Cookies.get(GITHUB_TOKEN_COOKIE_KEY);
  await fetch(`${GITHUB_ENDPOINT}/gists/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `token ${token}`
    }
  });
}

export async function deleteGistFile(id: string, filename: string): Promise<void> {
  const token = Cookies.get(GITHUB_TOKEN_COOKIE_KEY);

  await fetch(`${GITHUB_ENDPOINT}/gists/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `token ${token}`
    },
    body: JSON.stringify({
      files: {
        [filename]: {}
      }
    })
  });
}

// TODO: export async function searchGists(): Promise<any> {}
// TODO: export async function createGist(): Promise<any> {}
// TODO: export async function updateGist(): Promise<any> {}