import { UserStoreState } from "./UserStoreState";
import { UserStoreStatePatch } from "./UserStoreStatePatch";

interface Payload<T> {
  payload: T;
}

export function patch(state: UserStoreState, action: Payload<UserStoreStatePatch>): UserStoreState {
  return { ...state, ...action.payload };
}
