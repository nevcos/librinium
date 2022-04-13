import {createEmptyNoteState} from "../noteStoreState/noteStoreStateSelectors";
import {createEmptyState as createEmptyUserState} from "../userStoreState/userStoreStateSelectors";
import {StoreState} from "../../store/StoreState";

export function createEmptyState(): StoreState {
  return {
    note: createEmptyNoteState(),
    user: createEmptyUserState(),
  };
}
