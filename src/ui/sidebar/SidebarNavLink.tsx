import { memo } from "react";
import { useResolvedPath, useMatch, Link } from 'react-router-dom';

interface Props {
  to: string;
  children: JSX.Element[];
  [key: string]: unknown;
}

export const SidebarNavLink = memo(function ({ to, children, ...rest }: Props): JSX.Element {
  const { pathname } = useResolvedPath(to);
  const match = useMatch({ path: pathname, end: true });

  return (
    <Link to={to} className={match ? "--active" : ""} {...rest}>
      {children}
    </Link>
  );
});
