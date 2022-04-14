import { useUserSelector } from "../../hook/useUserSelector";
import { GITHUB_AUTH_ENDPOINT } from "../../remoteApi/gitHub/gitHubApi";
import { userStoreSelectors } from "../../store/userStore";
import * as Styled from "./Sidebar.style";

export function GitHubAuth(): JSX.Element | null {
  const isAuth = useUserSelector(userStoreSelectors.isAuth);

  function auth() {
    window.location.href = GITHUB_AUTH_ENDPOINT;
  }

  return !isAuth ? (
    <>
      <Styled.AuthText>
        Librinium uses GitHub Gists, please connect to GitHub to continue.
        <Styled.AuthLink href="#" onClick={() => auth()}>
          Connect to GitHub
        </Styled.AuthLink>
      </Styled.AuthText>
    </>
  ) : null;
}
