import { useSelector } from "react-redux";
import { NoteStoreState } from "../domain/noteStoreState/NoteStoreState";
import { StoreState } from "../store/StoreState";

export function useGistSelector<Selected>(selector: (state: NoteStoreState) => Selected): Selected {
  return useSelector((state: StoreState) => selector(state.note));
}
