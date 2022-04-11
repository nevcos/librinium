import { useGistSelector } from "../../hook/useGistSelector";

import { documentStoreSelectors } from "../../store/documentStore";

export function EmptyState(): JSX.Element {
  const isLoading = useGistSelector(documentStoreSelectors.isLoading);

  return isLoading ? (
    <>
      <span className="icon fa-solid fa-spinner" />
      waiting ...
    </>
  ) : (
    <>
      <span className="icon fa-solid fa-arrow-left-long" />
      select or create a document
    </>
  );
}
