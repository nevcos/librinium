import { DocumentStoreState } from "../domain/documentStoreState/DocumentStoreState";
import { UserStoreState } from "../domain/userStoreState/UserStoreState";

export interface StoreState {
  gist: DocumentStoreState;
  user: UserStoreState;
}
