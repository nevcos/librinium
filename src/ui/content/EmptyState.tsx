import styled from "styled-components";
import { useGistSelector } from "../../hook/useGistSelector";
import { useUserSelector } from "../../hook/useUserSelector";

import { noteStoreSelectors } from "../../store/noteStore";
import { userStoreSelectors } from "../../store/userStore";

export function EmptyState(): JSX.Element {
  const isAuth = useUserSelector(userStoreSelectors.isAuth);
  const isLoading = useGistSelector(noteStoreSelectors.isLoading);

  const iconClasses = "icon fa-solid fa-xl";

  const EmptyStateContainer = styled.div`
    width: 100%;
    height: 90%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    color: #bbb;

    > .icon {
      padding-bottom: 1.5rem;
    }
  `;

  return (
    <EmptyStateContainer>
      {isLoading ? (
        <>
          <span className={`${iconClasses} fa-spinner`} />
          waiting...
        </>
      ) : !isAuth ? (
        <>
          <span className="icon fa-solid fa-arrow-left-long fa-xl" />
          connect to github to continue...
        </>
      ) : (
        <>
          <span className="icon fa-solid fa-arrow-left-long fa-xl" />
          select or create a note
        </>
      )}
    </EmptyStateContainer>
  );
}
