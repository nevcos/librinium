import { useSelector } from "react-redux";

import { documentStoreSelectors } from "../../store/documentStore";

export function EmptyState(): JSX.Element {
  const isLoading = useSelector(documentStoreSelectors.isLoading);

  return isLoading ? (
    <>
      <span className="fa-solid fa-spinner" />
      waiting ...
    </>
  ) : (
    <>
      <span className="fa-solid fa-arrow-left-long" />
      select or create a document
    </>
  );
}
