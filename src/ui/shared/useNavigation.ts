import {useMatch, useNavigate, useResolvedPath} from "react-router-dom";
import {NavigateFunction} from "react-router/lib/hooks";

export interface UseNavigationApi {
  isActive(to: string): boolean;
  navigate: NavigateFunction;
}

export function useNavigation(): UseNavigationApi {
  const navigate = useNavigate();

  return {
    isActive(to: string) {
      const { pathname } = useResolvedPath(to);
      return !! useMatch({ path: pathname, end: true });
    },
    navigate
  }
}
