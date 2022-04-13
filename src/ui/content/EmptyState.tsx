import { useGistSelector } from "../../hook/useGistSelector";

import { noteStoreSelectors } from "../../store/noteStore";

export function EmptyState(): JSX.Element {
  const isLoading = useGistSelector(noteStoreSelectors.isLoading);

  return isLoading ? (
    <>
      <span className="icon fa-solid fa-spinner" />
      waiting ...
    </>
  ) : (
    <>
      <span className="icon fa-solid fa-arrow-left-long" />
      select or create a note
    </>
  );
}
