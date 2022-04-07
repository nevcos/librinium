import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getClientId, getToken } from "../remoteApi/githubApi";

export const GITHUB_URL_PARAM_CODE_KEY = "code";
export const GITHUB_TOKEN_COOKIE_KEY = "gh_token";
export const GITHUB_CLIENT_ID_COOKIE_KEY = "gh_client_id";

export const useGithub = () => {
  const [clientId, setClientId] = useState(undefined);

  useEffect(() => {
    if (!clientId) {
      // 1. get client id
      getSetClientId();
    } else {
      // 2. (try to) get token
      getSetToken();
    }
  }, [clientId]);

  async function getSetToken() {
    const URLParams = new URLSearchParams(window.location.search);
    const code = URLParams.get(GITHUB_URL_PARAM_CODE_KEY);

    if (!code) return;

    const token = (await getToken(code)) as unknown as string;
    Cookies.set(GITHUB_TOKEN_COOKIE_KEY, token);
    URLParams.delete(GITHUB_URL_PARAM_CODE_KEY);
  }

  async function getSetClientId() {
    const clientId = await getClientId();

    if (!clientId) return;

    Cookies.set(GITHUB_CLIENT_ID_COOKIE_KEY, clientId);
    setClientId(clientId);
  }
};
