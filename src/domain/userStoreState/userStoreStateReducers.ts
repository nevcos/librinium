import { UserStoreState } from "./UserStoreState";

interface Payload<T> {
  payload: T;
}

export function setAuth(state: UserStoreState, action: Payload<boolean>): void {
  state.isAuth = action.payload;
}
