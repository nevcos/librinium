import { memo } from "react";
import { useResolvedPath, useMatch, Link } from 'react-router-dom';
import {useNavigation} from "../shared/useNavigation";

interface Props {
  to: string;
  children: JSX.Element[];
  [key: string]: unknown;
}

export const SidebarNavLink = memo(function ({ to, children, ...rest }: Props): JSX.Element {
  const navigation = useNavigation();
  const isActive = navigation.isActive(to);

  return (
    <Link to={to} className={isActive ? "--active" : ""} {...rest}>
      {children}
    </Link>
  );
});
