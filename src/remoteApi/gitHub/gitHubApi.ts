import Cookies from "js-cookie";
import { Gist } from "./Gist";
import { GistPatch } from "./GistPatch";
import { User } from "./User";

const GITHUB_ENDPOINT = "https://api.github.com";
const CLOUDFLARE_ENDPOINT = "/api/github";
export const GITHUB_CLIENT_ID = "27ea828995278ad0d743";
export const GITHUB_CODE_SEARCH_PARAM_KEY = "code";
export const GITHUB_TOKEN_COOKIE_KEY = "gh_token";
export const GITHUB_AUTH_ENDPOINT = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=gist`;

//#region auth

export async function getToken(code: string): Promise<string> {
  const response = await fetch(`${CLOUDFLARE_ENDPOINT}/token/${code}`);
  if (!response.ok) throw new Error();
  return (await response.json())?.token;
}

//#endregion
//#region user

export async function getUser(): Promise<User> {
  const response = await fetch(`${GITHUB_ENDPOINT}/user`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      ...getAuthHeader()
    }
  });
  if (!response.ok) throw new Error();
  return await response.json();
}

//#endregion
//#region gists

export async function createGist(description: string): Promise<Gist> {
  const response = await fetch(GITHUB_ENDPOINT + "/gists", {
    method: "POST",
    headers: {
      Accept: "application/vnd.github.v3+json",
      ...getAuthHeader()
    },
    body: JSON.stringify({
      description,
      files: {
        "README.md": {
          content: "# hello from librinium!"
        }
      }
    })
  });

  if (!response.ok) throw new Error();
  return await response.json();
}

export async function getGists(): Promise<Gist[]> {
  const response = await fetch(`${GITHUB_ENDPOINT}/gists`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      ...getAuthHeader()
    }
  });
  if (!response.ok) throw new Error();
  return await response.json();
}

export async function updateGist(id: string, patch: GistPatch): Promise<void> {
  await fetch(`${GITHUB_ENDPOINT}/gists/${id}`, {
    method: "PATCH",
    headers: {
      ...getAuthHeader()
    },
    body: JSON.stringify(patch)
  });
}

export async function deleteGist(id: string): Promise<void> {
  await fetch(`${GITHUB_ENDPOINT}/gists/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader()
    }
  });
}

export async function deleteGistFile(id: string, filename: string): Promise<void> {
  await fetch(`${GITHUB_ENDPOINT}/gists/${id}`, {
    method: "PATCH",
    headers: {
      ...getAuthHeader()
    },
    body: JSON.stringify({
      files: {
        [filename]: {}
      }
    })
  });
}

//#endregion
//#region tools

function getAuthHeader() {
  const token = Cookies.get(GITHUB_TOKEN_COOKIE_KEY);
  return {
    Authorization: `token ${token}`
  };
}

//#endregion
