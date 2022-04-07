import { GITHUB_CLIENT_ID } from "../../remoteApi/githubApi";

export function GitHubAuth(): JSX.Element {
  function auth() {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`;
  }

  return <button onClick={() => auth()}>GHAuth</button>;
}
