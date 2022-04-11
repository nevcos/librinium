import { useSelector } from "react-redux";
import { UserStoreState } from "../domain/userStoreState/UserStoreState";
import { StoreState } from "../store/StoreState";

export function useUserSelector<Selected>(selector: (state: UserStoreState) => Selected): Selected {
  return useSelector((state: StoreState) => selector(state.user));
}
