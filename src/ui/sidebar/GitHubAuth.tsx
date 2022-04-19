import styled from "styled-components";

import { useUserSelector } from "../../hook/useUserSelector";
import { GITHUB_AUTH_ENDPOINT } from "../../remoteApi/gitHub/gitHubApi";
import { userStoreSelectors } from "../../store/userStore";

const Styled_AuthText = styled.p`
  padding: calc(var(--sidebar-padding) * 2);
`;

const Styled_AuthLink = styled.a`
  display: block;
  padding-top: 1rem;
  color: var(--color-secondary);
`;

export function GitHubAuth(): JSX.Element | null {
  const isAuth = useUserSelector(userStoreSelectors.isAuth);

  function auth() {
    window.location.href = GITHUB_AUTH_ENDPOINT;
  }

  return !isAuth ? (
    <>
      <Styled_AuthText>
        Librinium uses GitHub Gists, please connect to GitHub to continue.
        <Styled_AuthLink href="#" onClick={() => auth()}>
          Connect to GitHub
        </Styled_AuthLink>
      </Styled_AuthText>
    </>
  ) : null;
}
