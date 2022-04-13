import { NoteStoreState } from "../domain/noteStoreState/NoteStoreState";
import { UserStoreState } from "../domain/userStoreState/UserStoreState";

export interface StoreState {
  gist: NoteStoreState;
  user: UserStoreState;
}
