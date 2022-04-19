import { memo, useCallback, useState } from "react";
import MuiMenu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiListItemText from "@mui/material/ListItemText";

import { useGenerateRandomId } from "../../shared/useGenerateRandomId";
import { SidebarButton } from "../styled/SidebarButton";
import { Icon } from "../../shared/Icon";
import { MenuItem } from "./domain/MenuItem";

interface Props {
  items: MenuItem[];
}

export const SidebarMenuItemMenu = memo((props: Props) => {
  const btnId = useGenerateRandomId();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const closeMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

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
        {props.items.map((item, key) => (
          <>
            <MuiMenuItem
              onClick={(event) => {
                closeMenu();
                item.onClick(event);
              }}
              key={key}
            >
              {item.iconClassName && (
                <MuiListItemIcon>
                  <span className={item.iconClassName} aria-hidden="true" />
                </MuiListItemIcon>
              )}
              <MuiListItemText>{item.label}</MuiListItemText>
            </MuiMenuItem>
          </>
        ))}
      </MuiMenu>
    </>
  );
});
