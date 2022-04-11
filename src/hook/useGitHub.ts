import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getToken, GITHUB_TOKEN_COOKIE_KEY, GITHUB_CODE_SEARCH_PARAM_KEY } from "../remoteApi/githubApi";
import { userStoreActions } from "../store/userStore";

export const useGithub = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    tryToGetSetToken();
  }, []);

  async function tryToGetSetToken(): Promise<void> {
    const storedToken = Cookies.get(GITHUB_TOKEN_COOKIE_KEY);

    if (storedToken) {
      console.info("tryToGetSetToken() - already stored");
      return;
    }

    const code = new URLSearchParams(window.location.search).get(GITHUB_CODE_SEARCH_PARAM_KEY);

    if (!code) {
      console.info("tryToGetSetToken() - code missing");
    } else {
      const token = (await getToken(code)) as unknown as string;

      // save using cookies
      Cookies.set(GITHUB_TOKEN_COOKIE_KEY, token);

      // clear code from browser url by pushing a new history state
      cleanUrl();

      // update store
      dispatch(userStoreActions.setAuth(!!token));

      console.info("tryToGetSetToken() - success");
    }
  }

  function cleanUrl(): void {
    window.history.pushState({}, document.title, window.location.pathname);
  }
};
