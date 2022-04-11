import type { UserStoreState } from "./UserStoreState";

export function createEmptyState(): UserStoreState {
  return {
    isAuth: false
  };
}
