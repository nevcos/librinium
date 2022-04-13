import { NoteStoreState } from "../domain/noteStoreState/NoteStoreState";
import { UserStoreState } from "../domain/userStoreState/UserStoreState";

export interface StoreState {
  note: NoteStoreState;
  user: UserStoreState;
}
