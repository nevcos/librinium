import { To } from "react-router";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import { MenuItem } from "./domain/MenuItem";
import { SidebarMenuItemMenu } from "./SidebarNavBranchMenu";
import { sidebarButtonLink } from "../styled/sidebarButtonLink";
import {MouseEventHandler, useCallback, useState} from "react";
import { sidebarInput } from "../styled/sidebarInput";

const Styled_NavItem = styled.div`
  display: flex;
  opacity: 0.7;

  .nav-item-menu {
    display: none;
  }

  &:hover,
  &.--menu-open {
    opacity: 1;

    &:not(.--disabled) {
      background-color: var(--sidebar-item-hover-bg-color);
    }

    .nav-item-menu {
      display: initial;
    }
  }

  &.--active {
    opacity: 1;
    background-color: var(--sidebar-item-selected-bg-color);

    .nav-item-menu {
      display: initial;
    }
  }
`;

const resetInputAndLinkStyle = css`
  border: none;
  background-color: transparent;
  padding: 0;
  color: inherit;
  text-decoration: none;
  text-align: start;
`;

const navItemInnerAction = css`
  ${resetInputAndLinkStyle}

  width: 100%;
  padding: var(--input-padding);

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  > .icon {
    margin-inline-end: var(--input-padding);
  }
`;

const Styled_InnerActionLink = styled(Link)`
  ${navItemInnerAction}
`;

const Styled_InnerActionButton = styled.button`
  ${navItemInnerAction}
`;

const Styled_ChildrenList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-inline-start: 1em;
`;

interface Props {
  to?: To;
  onClick?: MouseEventHandler<HTMLElement>;
  isActive?: boolean;
  icon: JSX.Element;
  label: string;
  menu?: MenuItem[];
  children?: JSX.Element[];
  [key: string]: unknown;
}

export function SidebarNavBranch({ to, onClick, isActive, icon, label, menu, children, ...rest }: Props) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const isDisabled = !to && !onClick;
  const activeClass = isActive ? "--active" : "";
  const disabledClass = isDisabled ? "--disabled" : "";
  const menuOpenClass = isMenuOpen ? "--menu-open" : "";

  const onToggle = useCallback((isOpen) => setMenuOpen(isOpen), []);

  return (
    <li {...rest}>
      <Styled_NavItem className={activeClass + " " + disabledClass + " " + menuOpenClass}>
        {to ? (
          <Styled_InnerActionLink to={to} onClick={onClick} data-test-id="nav-item-link">
            {icon}
            {label ? <span>{label}</span> : <em>(no name)</em>}
          </Styled_InnerActionLink>
        ) : (
          <Styled_InnerActionButton onClick={onClick} disabled={isDisabled} data-test-id="nav-item-button">
            {icon}
            {label ? <span>{label}</span> : <em>(no name)</em>}
          </Styled_InnerActionButton>
        )}

        {menu && <SidebarMenuItemMenu onToggle={onToggle} items={menu} className="nav-item-menu" />}
      </Styled_NavItem>

      {children && <Styled_ChildrenList>{children}</Styled_ChildrenList>}
    </li>
  );
}
