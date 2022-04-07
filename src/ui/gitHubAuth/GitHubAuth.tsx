import Cookies from "js-cookie";
import { GITHUB_CLIENT_ID_COOKIE_KEY, GITHUB_TOKEN_COOKIE_KEY } from "../../hook/useGitHub";

export function GitHubAuth(): JSX.Element {
  const token = Cookies.get(GITHUB_TOKEN_COOKIE_KEY);
  const clientId = Cookies.get(GITHUB_CLIENT_ID_COOKIE_KEY);

  function auth() {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
  }

  return <>{clientId && !token && <button onClick={() => auth()}>show me my gists!</button>}</>;
}
