import Cookies from "js-cookie";
import { useEffect } from "react";
import { getToken, GITHUB_TOKEN_COOKIE_KEY, GITHUB_CODE_SEARCH_PARAM_KEY } from "../remoteApi/githubApi";

export const useGithub = () => {
  useEffect(() => {
    tryToGetSetToken();
  }, []);

  async function tryToGetSetToken(): Promise<void> {
    const code = new URLSearchParams(window.location.search).get(GITHUB_CODE_SEARCH_PARAM_KEY);

    if (!code) return;

    const token = (await getToken(code)) as unknown as string;
    // save using cookies
    Cookies.set(GITHUB_TOKEN_COOKIE_KEY, token);
    // clear code from browser url by pushing a new history state
    cleanUrl();
  }

  function cleanUrl(): void {
    window.history.pushState({}, document.title, window.location.pathname);
  }
};
