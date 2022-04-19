import { To } from "react-router";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import { MenuItem } from "./domain/MenuItem";
import { SidebarMenuItemMenu } from "./SidebarNavItemMenu";
import { sidebarButtonLink } from "../styled/sidebarButtonLink";
import {MouseEventHandler} from "react";

const navItemTrigger = css`
  ${sidebarButtonLink}
  text-decoration: none;
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Styled_NavLink = styled(Link)`
  ${sidebarButtonLink}
  text-decoration: none;
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Styled_NavButton = styled.button`
  ${navItemTrigger}
`;

interface Props {
  to?: To;
  onClick?: MouseEventHandler<HTMLElement>;
  icon: JSX.Element;
  label: string;
  items?: MenuItem[];
}

export function SidebarNavItem(props: Props) {
  return (
    <li>
      {props.to ? (
        <Styled_NavLink to={props.to} onClick={props.onClick} data-testid="nav-link">
          {props.icon}
          <span>{props.label}</span>
        </Styled_NavLink>
      ) : (
        <Styled_NavButton onClick={props.onClick} disabled={!props.onClick} data-testid="nav-link">
          {props.icon}
          <span>{props.label}</span>
        </Styled_NavButton>
      )}

      {props.items && <SidebarMenuItemMenu items={props.items} />}
    </li>
  );
}
