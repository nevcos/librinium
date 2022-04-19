import {MouseEvent, useCallback, useState} from "react";
import { To } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MuiMenu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiListItemText from "@mui/material/ListItemText";

import { sidebarButtonLink } from "../Sidebar.style";
import { useGenerateRandomId } from "../../shared/useGenerateRandomId";
import { Icon } from "../../shared/Icon";

const Styled_NavItem = styled.li``;

const Styled_NavLink = styled(Link)`
  ${sidebarButtonLink}
  text-decoration: none;
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Styled_NavLabel = styled.div`
  ${sidebarButtonLink}
  text-decoration: none;
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SidebarButton = styled.button`
  ${sidebarButtonLink}
`;

const Styled_Label = styled.span``;

interface MenuItem {
  iconClassName?: string;
  iconTitle?: string;
  label: string;
  onClick: (event: MouseEvent) => unknown;
  disabled?: boolean;
}

interface Props {
  to?: To;
  icon: JSX.Element;
  label: string;
  items: MenuItem[];
}

export function SidebarNavItem(props: Props) {
  const menu = useMenu(props.items);

  return (
    <Styled_NavItem>
      {props.to ? <Styled_NavLink to={props.to} data-testid="nav-link">
        {props.icon}
        <Styled_Label>{props.label}</Styled_Label>
      </Styled_NavLink> : <Styled_NavLabel data-testid="nav-link">
        {props.icon}
        <Styled_Label>{props.label}</Styled_Label>
      </Styled_NavLabel>}

      {menu}
    </Styled_NavItem>
  );
}

function useMenu(items: MenuItem[] = []) {
  const btnId = useGenerateRandomId();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const closeMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // if (!items.length) return null;

  const open = !!anchorEl;

  return (
    <>
      <SidebarButton
        aria-label="more"
        id={btnId}
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={openMenu}
      >
        <Icon className="icon fa-solid fa-ellipsis-vertical" title="Menu" />
      </SidebarButton>

      <MuiMenu
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        MenuListProps={{
          "aria-labelledby": btnId
        }}
      >
        {items.map((item, key) => (
          <>
            <MuiMenuItem onClick={(event) => { closeMenu(); item.onClick(event); }} key={key}>
              {item.iconClassName && <MuiListItemIcon><span className={item.iconClassName} aria-hidden="true" /></MuiListItemIcon>}
              <MuiListItemText>{item.label}</MuiListItemText>
            </MuiMenuItem>
          </>
        ))}
      </MuiMenu>
    </>
  );
}
