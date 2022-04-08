import { GITHUB_AUTH_ENDPOINT } from "../../remoteApi/githubApi";

export function GitHubAuth(): JSX.Element {
  function auth() {
    window.location.href = GITHUB_AUTH_ENDPOINT;
  }

  return <button onClick={() => auth()}>GHAuth</button>;
}
