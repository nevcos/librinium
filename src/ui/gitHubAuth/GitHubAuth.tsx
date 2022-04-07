import { useDataSource } from "../../hook/useDataSource";
import { GITHUB_CLIENT_ID, GITHUB_TOKEN_COOKIE_KEY } from "../../remoteApi/githubApi";
import { cookieResource } from "../../util/resource";

export function GitHubAuth(): JSX.Element {
  const token = useDataSource(cookieResource(GITHUB_TOKEN_COOKIE_KEY));

  function auth() {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`;
  }

  return <>{!token && <button onClick={() => auth()}>show me my gists!</button>}</>;
}
