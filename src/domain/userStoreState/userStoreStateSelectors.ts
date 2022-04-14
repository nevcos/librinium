import type { UserStoreState } from "./UserStoreState";

export function createEmptyState(): UserStoreState {
  return {
    isAuth: false
  };
}

export function isAuth(state: UserStoreState): boolean {
  return state.isAuth;
}
