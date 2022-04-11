import { useSelector } from "react-redux";
import { DocumentStoreState } from "../domain/documentStoreState/DocumentStoreState";
import { StoreState } from "../store/StoreState";

export function useGistSelector<Selected>(selector: (state: DocumentStoreState) => Selected): Selected {
  return useSelector((state: StoreState) => selector(state.gist));
}
