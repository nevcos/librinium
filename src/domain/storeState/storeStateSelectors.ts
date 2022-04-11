import {createEmptyGistState} from "../documentStoreState/documentStoreStateSelectors";
import {createEmptyState as createEmptyUserState} from "../userStoreState/userStoreStateSelectors";
import {StoreState} from "../../store/StoreState";

export function createEmptyState(): StoreState {
  return {
    gist: createEmptyGistState(),
    user: createEmptyUserState(),
  };
}
