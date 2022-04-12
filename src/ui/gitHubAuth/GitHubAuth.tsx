import { useUserSelector } from "../../hook/useUserSelector";
import { GITHUB_AUTH_ENDPOINT } from "../../remoteApi/gitHubApi";

export function GitHubAuth(): JSX.Element {
  const isAuth = useUserSelector((state) => state.isAuth);

  function auth() {
    window.location.href = GITHUB_AUTH_ENDPOINT;
  }

  return <>{!isAuth && <button onClick={() => auth()}>GHAuth</button>}</>;
}
